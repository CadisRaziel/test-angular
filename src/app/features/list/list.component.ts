import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { ProductsModel } from '../../shared/model/products.model';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs';


@Component({
  selector: 'app-confirmation-dialog',
  template: `<h2 mat-dialog-title>Deletar produto</h2>
      <mat-dialog-content>
       Tem certeza que quer deletar esse produto? 
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onNo()" style="background-color: brown;">Não</button>
        <button mat-raised-button (click)="onYes()" cdkFocusInitial style="background-color: green;">Sim</button>
      </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],

})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }
  
  onYes() {
    this.matDialogRef.close(true);
  }
}

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
  constructor(private productsService: ProductsService, private router: Router, private matDialog: MatDialog) { }

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
}