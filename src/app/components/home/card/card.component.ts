import { AfterViewInit, Component, ElementRef, inject, input, Input, Renderer2 } from '@angular/core';
import { CardFeature } from '../../../interfaces/CardFeature';

@Component({
  selector: 'app-card',
  imports: [],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements AfterViewInit {
  cardFeature = input.required<CardFeature>();

  #el = inject(ElementRef);
  #renderer = inject(Renderer2);

  ngAfterViewInit() {

    if(this.cardFeature){
      // Selecciona el contenedor donde quieres insertar el SVG
      const svgContainer = this.#el.nativeElement.querySelector('.flex.justify-center.items-center.mb-4');
 
      // Inserta el SVG directamente en el contenedor
      this.#renderer.setProperty(svgContainer, 'innerHTML', this.cardFeature().svg);
    }
   }
}
