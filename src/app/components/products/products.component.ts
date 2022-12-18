import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe-decorator";
import {Product} from "../../types/interfaces";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[]

  @AutoUnsubscribe()
  productsSubs: Subscription

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.productsSubs = this.productsService.filteredProducts$.subscribe(_ => {
      this.products = this.productsService.getSortedFilteredProducts()
    })
  }
}

