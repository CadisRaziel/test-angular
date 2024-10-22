import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsService } from '../../shared/services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  
  constructor(private productsService: ProductsService, private snackBar: MatSnackBar, private router: Router ) { }
  //productsService = inject(ProductsService);
  //matSnackBar = inject(MatSnackBar);
  //router = inject(Router);

  form = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: Validators.required })
  });

  onSubmit() {
    //para ser usago em congunto com o ngSubmit
    this.productsService.post({
     title: this.form.controls.title.value //-> Recuperar o value
    }).subscribe(() => {
      this.snackBar.open('Produto adicionado com sucesso', 'Ok',
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
