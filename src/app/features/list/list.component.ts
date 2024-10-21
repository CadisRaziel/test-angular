import { Component, inject, Inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { ProductsModel } from '../../shared/model/products.model';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    //Importando meu component de card feito so para o card
    //Veja como podemos componetizar assim como o flutter
    CardComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: ProductsModel[] = [];

  //productsService = inject(ProductsService);
  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    // this.httpClient.get<any>('http://localhost:3000/products').subscribe((products) => {
    this.productsService.getAll().subscribe((products) => { //-> Utilizando a url com o nosso proxy     
      this.products = products
    });
  }
}