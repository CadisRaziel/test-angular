import { Component } from '@angular/core';
import { ProductsModel } from '../../shared/model/products.model';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { ProductsService } from '../../shared/services/products.service';
import { ConfirmationDialogService } from '../../shared/utils/confirmation-dialog.service';




@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    //Importando meu component de card feito so para o card
    //Veja como podemos componetizar assim como o flutter
    CardComponent,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: ProductsModel[] = [];

  //productsService = inject(ProductsService);
  constructor(private productsService: ProductsService, private router: Router, private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    // this.httpClient.get<any>('http://localhost:3000/products').subscribe((products) => {
    this.productsService.getAll().subscribe((products) => { //-> Utilizando a url com o nosso proxy     
      this.products = products
    });
  }

  onEdit(product: ProductsModel) {
    //debugger
    //O navigate aaqui basicamente faz um join e manda pra rota
    this.router.navigate([
      '/edit-product',
      product.id
    ])
  }

  onDelete(product: ProductsModel) {
    this.confirmationDialogService
      .openDialog()
      .pipe(filter(answer => answer === true))
      .subscribe(() => {
        this.productsService.delete(product.id).subscribe(() => {
          //depois que deleta chama a lista denovo
          this.productsService.getAll().subscribe((products) => {
            this.products = products
          });
        });
      });
  }
}

/*

Metodo sem a refatoracao do 'utils > confirmation-dialog.service.ts'

  onDelete(product: ProductsModel) {
    this.matDialog.open(ConfirmationDialogComponent)
    .afterClosed()
    .pipe(filter(answer => answer === true)) //Um filtro para que se for verdadeiro ai sim ele vai pro subscribe
    //.subscribe((answer: boolean) => { //se nao tivesse o pipe eu teria que passar esse parametro para fazer o if abaixo
    .subscribe(() => {
      // console.log( 'afterClosed' ,answer)
      //se nao tivesse o 'pipe' eu faria um 'if' aqui dentro para ver se answer e true
        this.productsService.delete(product.id).subscribe(() => {

          //depois que deleta chama a lista denovo
          this.productsService.getAll().subscribe((products) => {      
            this.products = products
          });
        })      
    })

    // this.router.navigate([
    //   '/delete-product',
    //   product.id
    // ])
  }
*/