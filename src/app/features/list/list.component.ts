import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: any[] = [];

    httpClient = inject(HttpClient);


    ngOnInit() {
      // this.httpClient.get<any>('http://localhost:3000/products').subscribe((products) => {
      this.httpClient.get<any>('/api/products').subscribe((products) => { //-> Utilizando a url com o nosso proxy     
        this.products = products
      });
    }    
}