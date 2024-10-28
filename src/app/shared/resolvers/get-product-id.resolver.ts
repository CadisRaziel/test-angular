import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { ProductsService } from "../services/products.service";

export const getProductById = (route: ActivatedRouteSnapshot) => {
    const productService = inject(ProductsService);

    //!preciso pegar o produto por id primeiro
    //productService.getById(route.params['id'])
    return productService.getById(route.paramMap.get('id') as string)

}