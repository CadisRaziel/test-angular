import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { CreateComponent } from './features/create/create.component';
import { inject } from '@angular/core';
import { ProductsService } from './shared/services/products.service';

export const routes: Routes = [
    {
        path: '', //A rota vazia significa o '/'
        component: ListComponent,
        resolve: {
            //productsResolve: -> um valor dinamico que a gente inventa, pois o resolve e um objeto chave e valor
            productsResolve: () => {
                const productService = inject(ProductsService);                
                return productService.getAll();
            }
        }
    },
    {
        path: 'create-product',
        loadComponent: () => import('./features/create/create.component').then(m => m.CreateComponent) //-> Chamando o componente de forma `lazy` igual flutter 
        // component: CreateComponent,
    },
    {
        path: 'edit-product/:id', //pasando e recuperando id
        resolve: {
            //Recuperando o objeto id atraves do resolve (Vou recupera-los antes do EditComponent ser inicializado, quando inicializado o resolve passa esses dados pro EditComponent)
            product: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
                const productService = inject(ProductsService);

                //!preciso pegar o produto por id primeiro
                //productService.getById(route.params['id'])
                return productService.getById(route.paramMap.get('id') as string)

            }
        },
        loadComponent: () => import('./features/edit/edit.component').then(m => m.EditComponent) //-> Chamando o componente de forma `lazy` igual flutter 
    }
];
