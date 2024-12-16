import { ChangeDetectionStrategy, Component, computed, effect, HostListener, inject, input, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Alcohol } from '@interfaces/alcohol/alcohol';
import { PaginationService } from '../../services/pagination.service';
import { BtnTopComponent } from '../btn-top/btn-top.component';
import { DrinkItemComponent } from "../../components/drink-item/drink-item.component";
import { IdService } from '../../services/id.service';

@Component({
  selector: 'app-list-drinks',
  imports: [BtnTopComponent, DrinkItemComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list-drinks.component.html',
  styleUrl: './list-drinks.component.css'
})
export class ListDrinksComponent {
  listDrinks = input.required<Alcohol[]>();

  displayedDrinks: Alcohol[] = [];

  #router = inject(Router);
  #idService = inject(IdService);

  #paginationService = inject(PaginationService);

  constructor(){
    effect(() => {
      this.displayedDrinks = this.#paginationService.getDisplayedItems()
    });
    
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const windowScroll = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (windowScroll >= documentHeight - 100) { // Cargar más datos cuando el usuario esté cerca del final
      this.#paginationService.loadMore();
    }
  }

  redirectDrink(id: number){
    this.#router.navigate(["/bebida"]);
    this.#idService.setId(id);
  }
}
