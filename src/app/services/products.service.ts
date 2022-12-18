import {nanoid} from "nanoid";
import {BehaviorSubject, Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product, ProductFromLinkResponse, Products, Response, SimpleOption} from "../types/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products$: BehaviorSubject<Products> = new BehaviorSubject<Products>({})
  filteredProducts$: BehaviorSubject<Products> = new BehaviorSubject<Products>({})
  sortBy$: BehaviorSubject<SimpleOption> = new BehaviorSubject<SimpleOption>({value: 'date', title: 'даті'})

  constructor(private http: HttpClient) {
    this.products = JSON.parse(localStorage.getItem('products')) || {}
  }

  set products(products: Products) {
    localStorage.setItem('products', JSON.stringify(products))
    this.products$.next(products)
  }

  set filteredProducts(filteredProducts: Products) {
    this.filteredProducts$.next(filteredProducts)
  }

  set sortBy(sortBy: SimpleOption) {
    this.sortBy$.next(sortBy)
    this.filteredProducts = this.getSortedFilteredProducts()
  }

  getSortedFilteredProducts() {
    const sortBy = this.sortBy$.getValue().value
    const filteredProducts: Product[] = Object.values(this.filteredProducts$.getValue())

    if (sortBy === 'categoryValue') {
      return filteredProducts.sort(({categoryValue: nameA}, {categoryValue: nameB}) => {
        if (nameA < nameB) {
          return -1;
        } else if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
    }
    return filteredProducts.sort((a, b) => a[sortBy] - b[sortBy])
  }

  addProduct(product: { link: string, customName?: string }) {
    return this.getProductFromLink(product.link).subscribe((response: Response<ProductFromLinkResponse>) => {
      const products = this.products$.getValue()
      const isExist = Object.values(products).find((productFromProducts: Product) => productFromProducts.link === product.link)

      if (isExist) {
        return
      }

      const id = nanoid()
      const {title: name, price: currentPrice, category, mainImage} = response.data
      const categoryValue = category.toLowerCase().split(' ').join('-')

      this.products = {
        ...products,
        [id]: {id, date: Date.now(), name, currentPrice, category, categoryValue, mainImage, ...product}
      }
    });
  }

  removeProduct(productId: number): Products {
    const products = this.products$.getValue()
    delete products[productId]
    this.products = products
    return products
  }

  getProductFromLink(link: string): Observable<Response<ProductFromLinkResponse>> {
    return this.http.post<Response<ProductFromLinkResponse>>('/api/parser/get-product', {link})
  }

  refreshPrice(product: Product) {
    this.getProductFromLink(product.link).subscribe((response: Response<ProductFromLinkResponse>) => {
      const products = this.products$.getValue()

      if (product.currentPrice > response.data.price) {
        this.products = {
          ...products,
          [product.id]: {
            ...product,
            oldPrice: product.currentPrice,
            currentPrice: response.data.price
          }
        }
      } else if (product.currentPrice < response.data.price && product.oldPrice < response.data.price) {
        this.products = {
          ...products,
          [product.id]: {
            ...product,
            oldPrice: null,
            currentPrice: response.data.price
          }
        }
      } else if (product.currentPrice < response.data.price) {
        this.products = {
          ...products,
          [product.id]: {
            ...product,
            currentPrice: response.data.price
          }
        }
      }
    })
  }
}
