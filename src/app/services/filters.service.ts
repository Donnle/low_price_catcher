import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {SimpleOption, PriceFilter, Product, Products} from "../types/interfaces";
import {ProductsService} from "./products.service";

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  categoriesFilterItems$: BehaviorSubject<SimpleOption[]> = new BehaviorSubject<SimpleOption[]>([])
  priceFilter$: BehaviorSubject<PriceFilter> = new BehaviorSubject<PriceFilter>({min: -Infinity, max: Infinity})
  selectedCategory$: BehaviorSubject<SimpleOption> = new BehaviorSubject<SimpleOption>({value: 'всі', title: 'Всі'})

  constructor(private productsService: ProductsService) {
    this.productsService.products$.subscribe((products) => {
      this.setCategoryFilters(products)
      this.getFilteredProducts()
    })
  }

  set categories(categories: SimpleOption[]) {
    const categoriesWithAll = [{title: 'Всі', value: 'ALL'}, ...categories]
    this.categoriesFilterItems$.next(categoriesWithAll)
    this.getFilteredProducts()
  }

  set selectedCategory(selectedCategory: SimpleOption) {
    this.selectedCategory$.next(selectedCategory)
    this.getFilteredProducts()
  }

  set minPrice(minPrice: number) {
    this.priceFilter$.next({...this.priceFilter$.getValue(), min: minPrice || -Infinity})
    this.getFilteredProducts()
  }

  set maxPrice(maxPrice: number) {
    this.priceFilter$.next({...this.priceFilter$.getValue(), max: maxPrice || Infinity})
    this.getFilteredProducts()
  }

  setCategoryFilters(products: Products) {
    const productsValues: Product[] = Object.values(products)
    let uniqueCategories = [];

    productsValues.map((product: Product) => {
      const isAlreadyIn = uniqueCategories.find((uniqueCategory) => uniqueCategory.value === product.categoryValue)
      if (!isAlreadyIn) {
        uniqueCategories.push({title: product.category, value: product.categoryValue})
      }
    })

    return this.categories = uniqueCategories
  }

  getFilteredProducts({min, max}: { min: number, max: number } = this.priceFilter$.getValue()) {
    const products = this.productsService.products$.getValue()
    const selectedCategory = this.selectedCategory$.getValue().value
    const productsValues = Object.values(products)
    let filteredProducts: Product[];

    if (selectedCategory === 'ALL') {
      filteredProducts = productsValues.filter(
        (product: Product) => product.currentPrice >= min && product.currentPrice <= max
      )
    } else {
      filteredProducts = productsValues.filter(
        (product: Product) => product.categoryValue === selectedCategory && product.currentPrice >= min && product.currentPrice <= max
      )
    }

    console.log('selectedCategory: ', selectedCategory)
    console.log('filteredProducts: ', filteredProducts)
    return this.productsService.filteredProducts = filteredProducts
  }
}
