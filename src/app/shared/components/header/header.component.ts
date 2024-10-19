import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar' //-> import feito a mao
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule], //-> Componentes de package que irei utilizar nesse componente header (muitas vezes o import tem que ser escrito na mao) isso sera usado no html desse component
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
