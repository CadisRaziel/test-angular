import { Component, inject, signal } from '@angular/core';
import { ProductsModel } from '../../shared/model/products.model';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  //ActivatedRoute -> retorna o valor que foi manipulado la na rota com o resolve (retorna o que foi gerado la) 
  //Adicionando signal para deixar a variavel reativa
  //essa api de reacao do signal vai dar um efeito ao deltar um produto que e o seguinte(sem o signal ao deletar um produto ele meio que pisca a tela como se esperasse um loader), agora com o signal ele nao pisca mais
  //isso acontece porque estamos atribuindo o valor ao signal e estamos colocando 'productsResolve' dentro dele, ou seja a instancia do signal nao mudou e o que aconteceu foi o valor interno do signal mudou mais isso nao afetou a instancia do signal
  //ou seja a reacao aconteceu apenas com outro valor, em questao de instancia ficou a mesma 
  products = signal<ProductsModel[]>(inject(ActivatedRoute).snapshot.data['productsResolve']);

  //productsService = inject(ProductsService);
  constructor(private productsService: ProductsService, private router: Router, private confirmationDialogService: ConfirmationDialogService) { }

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
            // this.products = products //-> Ao inves de passa o produto (reatribuindo valor), nos usaremos o 'set'
            this.products.set(products) //-> Aqui iremos passar a nova lista de produtos
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