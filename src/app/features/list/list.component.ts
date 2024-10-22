import { Component, inject, Inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { ProductsModel } from '../../shared/model/products.model';
import { CardComponent } from './components/card/card.component';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

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
  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    // this.httpClient.get<any>('http://localhost:3000/products').subscribe((products) => {
    this.productsService.getAll().subscribe((products) => { //-> Utilizando a url com o nosso proxy     
      this.products = products
    });
  }

  onEdit() {
    debugger
    this.router.navigateByUrl('/edit-product')
  }
}