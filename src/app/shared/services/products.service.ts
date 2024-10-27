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

    getById(id: string) {
      return this.http.get<ProductsModel>(`/api/products/${id}`);    
    }


    post(payload: PayloadProductsModel) {
      // this.httpClient.get<any>('http://localhost:3000/products').subscribe((products) => {
        return this.http.post('/api/products' , payload);
    }

    put(id: string, payload: PayloadProductsModel) {
      // this.httpClient.get<any>('http://localhost:3000/products').subscribe((products) => {
        return this.http.put(`/api/products/${id}`, payload);
    }

    delete(id: string) {
      return this.http.delete(`/api/products/${id}`);
    }
}



//patch -> um unico item
//put -> varios itens de uma vez (geralmente a gente usa o put para alterar 1 item so tambem)