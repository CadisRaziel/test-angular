import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import { ProductsModel } from '../../shared/model/products.model';
import { ProductsService } from '../../shared/services/products.service';



@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {

  constructor(private productsService: ProductsService, private snackBar: MatSnackBar, private router: Router) { }
  //productsService = inject(ProductsService);
  //matSnackBar = inject(MatSnackBar);
  //router = inject(Router);


  onSubmit(product: ProductsModel) {
    //para ser usago em congunto com o ngSubmit
    this.productsService.post(product).subscribe(() => {
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
