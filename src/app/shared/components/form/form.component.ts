import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsModel } from '../../model/products.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  //!Componetizacao especifico para produto e para os components que utilizam produtos como EditComponnet e CreateComponent

  product = input<ProductsModel | null>(null);
  form!: FormGroup;
  //submit -> nao usar esse nome no output e uma palavra reservada
  // @Output() submit = new EventEmitter<ProductsModel>();
  @Output() done = new EventEmitter<ProductsModel>();

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(this.product()?.title ?? '', { nonNullable: true, validators: Validators.required })
    });
  }


  onSubmit() {
    const product = this.form.value as ProductsModel;
    this.done.emit(product);
  }
}
