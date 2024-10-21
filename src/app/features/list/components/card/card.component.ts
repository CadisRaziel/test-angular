import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card'; //O import ou eu coloco na mao ou eu vou la no site do material angular procurar
import { MatButtonModule } from '@angular/material/button'; //O import ou eu coloco na mao ou eu vou la no site do material angular procurar
import { ProductsModel } from '../../../../shared/model/products.model';


//!Como eu estou componetizando esse card tudo que eu usar de lib `import` eu coloco aqui

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
      //Aqui irei importa os components que esse component list ira usar
      MatCardModule,
      MatButtonModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  //input -> funcionalidade que veio com o angular 17.1
  //Estamos utilizando ela para poder pergar o ProductsModel para podermos utilizar o for nesse component e nao no da list aonde e inicializado a lista
  //Isto e um signal (repare que e uma funcao e tem propriedade)

  // productItemComponent = input<ProductsModel>() -> Somente input ele fica de forma opcional os atributos
  productItemComponent = input.required<ProductsModel>() //-> estou informando que o input agora e obrigatorio, nao pode ser nulo

  //aqui vamos fazer um get para que ali no html nao fique assim -> productItemComponent().title
  //<mat-card-title>{{ productItemComponent().title }}</mat-card-title>
  //computed -> signal que permite apenas leitura
  //computed -> ele escuta outro signal que se ele mudar ele recomputa (atualiza ou roda a logica dentro dele e retorna atualizado)
  productTitle = computed(() => this.productItemComponent().title);
}
