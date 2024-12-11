import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CardFeature } from '../../../interfaces/CardFeature';

@Component({
  selector: 'app-features',
  imports: [CardComponent],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  listCards: CardFeature[] = [
    {
      svg: `<svg class='mr-2 -ml-1 w-5 h-5 group-hover:text-custom-violet' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z" clip-rule="evenodd"/>
      </svg>
      `,
      title: "Buscar cocktail por nombre",
      descripion: "Encuentra fácilmente tu cocktail favorito ingresando su nombre. Explora recetas, ingredientes y consejos para preparar la bebida perfecta en cualquier ocasión."
    },
    {
      svg: `<svg class='mr-2 -ml-1 w-5 h-5 group-hover:text-custom-violet' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
      </svg>
      `,
      title: "Buscar cocktail por ingrediente",
      descripion: "Descubre deliciosos cocktails utilizando los ingredientes que ya tienes. Simplemente ingresa un ingrediente y encuentra recetas creativas para disfrutar."
    },
    {
      svg: `<svg class='mr-2 -ml-1 w-5 h-5 group-hover:text-custom-violet' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z" clip-rule="evenodd"/>
      </svg>
      `,
      title: "Buscar cocktail aleatorio",
      descripion: "¿Listo para probar algo nuevo? Genera un cocktail aleatorio y sorpréndete con recetas inesperadas para disfrutar en cualquier ocasión."
    },
    {
      svg: `<svg class='mr-2 -ml-1 w-5 h-5 group-hover:text-custom-violet' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.05 3C3.291 3 2.352 5.024 3.51 6.317l5.422 6.059v4.874c0 .472.227.917.613 1.2l3.069 2.25c1.01.742 2.454.036 2.454-1.2v-7.124l5.422-6.059C21.647 5.024 20.708 3 18.95 3H5.05Z"/>
      </svg>
      `,
      title: "Filtrar por sus categorías",
      descripion: "Explora cocktails organizados por categorías. Filtra tus opciones para encontrar la bebida perfecta según tu gusto y ocasión."
    },
    {
      svg: `<svg class='mr-2 -ml-1 w-5 h-5 group-hover:text-custom-violet' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='currentColor' viewBox='0 0 24 24'>
              <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd"/>
            </svg>`,
      title: "Filtrar por bebida alcoholica",
      descripion: "Selecciona tu preferencia y filtra por bebidas alcohólicas. Encuentra los cocktails que contienen tus licores favoritos y disfruta de una experiencia única."
    },
    {
      svg: `<svg class='mr-2 -ml-1 w-5 h-5 group-hover:text-custom-violet' aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M5.5 3a1 1 0 0 0 0 2H7v2.333a3 3 0 0 0 .556 1.74l1.57 2.814A1.1 1.1 0 0 0 9.2 12a.998.998 0 0 0-.073.113l-1.57 2.814A3 3 0 0 0 7 16.667V19H5.5a1 1 0 1 0 0 2h13a1 1 0 1 0 0-2H17v-2.333a3 3 0 0 0-.56-1.745l-1.616-2.82a1 1 0 0 0-.067-.102 1 1 0 0 0 .067-.103l1.616-2.819A3 3 0 0 0 17 7.333V5h1.5a1 1 0 1 0 0-2h-13Z" clip-rule="evenodd"/>
      </svg>
      `,
      title: "Filtrar por el tipo de vaso",
      descripion: "Personaliza tu búsqueda filtrando por el tipo de vaso. Descubre cocktails ideales para cada presentación y sorprende a tus invitados con estilo."
    },
  ];

}
