import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsModel } from '../model/products.model';
import { PayloadProductsModel } from '../model/payload.products.model';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   
   constructor(private http: HttpClient) {    
   }
 
    getAll() {
      // this.httpClient.get<any>('http://localhost:3000/products').subscribe((products) => {
      return this.http.get<ProductsModel[]>('/api/products');    
    }    


    post(payload: PayloadProductsModel) {
      // this.httpClient.get<any>('http://localhost:3000/products').subscribe((products) => {
        return this.http.post('/api/products' , payload);
    }
}
