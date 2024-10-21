import { Component, inject, Inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { ProductsModel } from '../../shared/model/products.model';
import { MatCardModule } from '@angular/material/card'; //O import ou eu coloco na mao ou eu vou la no site do material angular procurar
import { MatButtonModule } from '@angular/material/button'; //O import ou eu coloco na mao ou eu vou la no site do material angular procurar

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    //Aqui irei importa os components que esse component list ira usar
    MatCardModule,
    MatButtonModule
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