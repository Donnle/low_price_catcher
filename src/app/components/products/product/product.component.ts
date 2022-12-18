import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../../types/interfaces";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input()
  product: Product
  private refreshPriceInterval;
  private REFRESH_TIME = 1000 * 60 * 60 // 60 minutes

  constructor(private productsService: ProductsService) {
  }

  removeProduct() {
    this.productsService.removeProduct(this.product.id)
  }

  ngOnInit(): void {
    this.productsService.refreshPrice(this.product)
    this.refreshPriceInterval = setInterval(() => this.productsService.refreshPrice(this.product), this.REFRESH_TIME);
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshPriceInterval)
  }
}
