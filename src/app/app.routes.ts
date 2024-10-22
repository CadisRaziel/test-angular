import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { CreateComponent } from './features/create/create.component';

export const routes: Routes = [
    {
        path: '', //A rota vazia significa o '/'
        component: ListComponent
    },
    {
        path: 'create-product',
        loadComponent: () => import('./features/create/create.component').then(m => m.CreateComponent) //-> Chamando o componente de forma `lazy` igual flutter 
        // component: CreateComponent,
    },
    {
        path: 'edit-product',
        loadComponent: () => import('./features/edit/edit.component').then(m => m.EditComponent) //-> Chamando o componente de forma `lazy` igual flutter 
    }
];
