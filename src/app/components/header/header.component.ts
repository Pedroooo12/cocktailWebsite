import { Component } from '@angular/core';


import { ItemMenu } from '../../interfaces/ItemMenu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  menu: ItemMenu[] = [
    {
      title: "Inicio",
      path: "/"
    },
    {
      title: "Nombre",
      path: "/nombre"
    },
    {
      title: "Alcohol",
      path: "/alcohol"
    },
    {
      title: "Ingredientes",
      path: "/ingredientes"
    },
    {
      title: "Tipo de Vaso",
      path: "/tipo-vaso"
    },
    {
      title: "Aleatorio",
      path: "/aleatorio"
    }
  ]

  toggle(){
    const menu = document.getElementById("div_menu");
    menu?.classList.toggle("hidden");
  }

  closeToggleRedirect(){
    const btnMenu = document.getElementById("btnMenu");
    if(btnMenu) this.toggle();
  }
}
