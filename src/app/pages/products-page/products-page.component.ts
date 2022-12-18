import {Subscription} from "rxjs";
import {Component} from '@angular/core';
import {AutoUnsubscribe} from "ngx-auto-unsubscribe-decorator";
import {FiltersService} from "../../services/filters.service";
import {SimpleOption} from "../../types/interfaces";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent {
  isAddPopupOpen: boolean = false
  minPrice: number
  maxPrice: number

  @AutoUnsubscribe()
  categoriesFilterItemsSubs: Subscription

  sortOptions = [
    {
      title: 'Даті',
      value: 'date'
    },
    {
      title: 'Старій ціні',
      value: 'oldPrice'
    },
    {
      title: 'Теперішній ціні',
      value: 'currentPrice'
    },
    {
      title: 'Категорії',
      value: 'categoryValue'
    }
  ]

  categories = [];

  constructor(
    public filtersService: FiltersService,
    public productsService: ProductsService
  ) {
    this.categoriesFilterItemsSubs = this.filtersService.categoriesFilterItems$.subscribe((categoryFilters) => {
      this.categories = categoryFilters
      this.filtersService.selectedCategory = categoryFilters[0]
    })
  }

  openPopup() {
    this.isAddPopupOpen = true
  }

  closePopup() {
    this.isAddPopupOpen = false
  }

  onFilterByCategoryChange(newFilterValue: string) {
    const categories = this.filtersService.categoriesFilterItems$.getValue()
    console.log('filter category:', newFilterValue)
    console.log('filter categories:', categories)
    this.filtersService.selectedCategory = categories.find((category: SimpleOption) => category.value === newFilterValue)
  }

  onMinPriceChange(newMinPrice) {
    this.filtersService.minPrice = +newMinPrice
  }

  onMaxPriceChange(newMaxPrice) {
    this.filtersService.maxPrice = +newMaxPrice
  }

  onSortByChange(newSortByValue: string) {
    this.productsService.sortBy = this.sortOptions.find((sortOption: SimpleOption) => sortOption.value === newSortByValue)
  }
}
