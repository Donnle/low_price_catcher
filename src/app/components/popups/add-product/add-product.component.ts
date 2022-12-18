import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductsService} from "../../../services/products.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  form: FormGroup;

  @Output() closePopup = new EventEmitter()

  constructor(private formBuilder: FormBuilder, private productsService: ProductsService) {
    this.form = this.formBuilder.group({
      customName: '',
      link: '',
    })
  }

  async onSubmit() {
    if (!this.form.value.link) {
      return alert('Missed link')
    }
    this.productsService.addProduct(this.form.value)
    this.closePopup.emit()
  }

  onClose() {
    this.closePopup.emit()
  }
}
