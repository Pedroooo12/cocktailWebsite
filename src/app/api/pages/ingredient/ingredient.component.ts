import { ChangeDetectionStrategy, Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { Alcohol } from '@interfaces/alcohol/alcohol';
import { AlertInfo } from '@interfaces/alertInfo';
import { Glass } from '@interfaces/glass';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { PaginationService } from '../../services/pagination.service';
import { IngredientCategory } from '@interfaces/ingredient/ingredientCategory';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { ListDrinksComponent } from '../../shared/list-drinks/list-drinks.component';

@Component({
  selector: 'app-ingredient',
  imports: [
    NgxSpinnerComponent,
    SpinnerComponent,
    AlertComponent,
    ListDrinksComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.css',
})
export class IngredientComponent implements OnDestroy{
  #alertService = inject(AlertService);
  #apiService = inject(ApiService);
  #paginationService = inject(PaginationService);
  #spinner = inject(NgxSpinnerService);

  #listIngredients = signal<IngredientCategory[]>([]);
  listIngredientsComputed = computed(() => this.#listIngredients());

  #listDrinks = signal<Alcohol[]>([]);
  listDrinksComputed = computed(() => this.#listDrinks());

  firstTime: boolean = false;

  selectedValue: string = '';

  //alerts
  arrivedDrinkMessage: AlertInfo = {
    message: 'Los cocktailes han sido generados',
    type: 'correcto',
  };

  changedDrinkMessage: AlertInfo = {
    message: 'Los cocktailes han sido cambiados',
    type: 'cambiado',
  };

  constructor(){
    this.fecthListIngredients();
  }


  ngOnDestroy(): void {
    this.#paginationService.reset();
    this.#alertService.reset();
  }

  fecthListIngredients(){
    this.#spinner.show();
    this.#apiService.getListIngredients().subscribe({
      next: (response) => {
        this.#listIngredients.set(response.drinks);
        this.#spinner.hide();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  fecthListDrinks(){
    this.#spinner.show();
    if(this.selectedValue != ""){
      this.#apiService.getListDrinksByIngredient(this.selectedValue).subscribe(
        {
          next: (response) => {
            this.#listDrinks.set(response.drinks);
            if(this.#listDrinks.length > 0) this.#paginationService.reset();
            this.#paginationService.loadItems(this.#listDrinks());
            this.handleAlerts();
            this.#spinner.hide();
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    }
  }

  private handleAlerts(){
    if(!this.firstTime){
      this.firstTime = true;
      this.#alertService.showAlertAndHide(this.arrivedDrinkMessage);
    }else{
      this.#alertService.showAlertAndHide(this.changedDrinkMessage);
    }
  }

  getValueFromSelect(event: any){
    const selectElement = event.target as HTMLSelectElement; // Asegúrate de que el evento es del tipo correcto
    this.selectedValue = selectElement.value;
    if(this.#listDrinks().length > 0) this.resetDrinks(); 
    this.fecthListDrinks();
  }

  resetDrinks(){
    this.#paginationService.reset();
    this.#listDrinks.set([]);
  }

}
