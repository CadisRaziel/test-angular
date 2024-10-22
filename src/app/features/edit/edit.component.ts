import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsModel } from '../../shared/model/products.model';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  constructor(private productsService: ProductsService, private snackBar: MatSnackBar, private router: Router ) { }


  //Recuperando o produto do meu resolve la do arquivo `app.routes.ts`
  product: ProductsModel = inject(ActivatedRoute).snapshot.data['product']

  form = new FormGroup({
    title: new FormControl<string>(this.product.title, { nonNullable: true, validators: Validators.required })
  });

  onSubmit() {
    //para ser usago em congunto com o ngSubmit
    this.productsService.put( this.product.id, {
     title: this.form.controls.title.value //-> Recuperar o value
    }).subscribe(() => {
      this.snackBar.open('Produto editado com sucesso', 'Ok',
        //!Como configuramos as propriedades em uma constate global no `app.config.ts` nos nao precisamos mais passar nada aqui
      //    {
      //   duration: 3000,
      //   horizontalPosition: 'right',
      //   verticalPosition: 'top'      
      // }
    );
      this.router.navigateByUrl('/').catch(console.log)
      //se der um erro vai aparecer no console
    })    
  }
}