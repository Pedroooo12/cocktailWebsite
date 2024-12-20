import { ChangeDetectionStrategy, Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { Alcohol } from '@interfaces/alcohol/alcohol';
import { AlcoholCategory } from '@interfaces/alcohol/alcoholCategory';
import { AlertInfo } from '@interfaces/alertInfo';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { PaginationService } from '../../services/pagination.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { ListDrinksComponent } from '../../shared/list-drinks/list-drinks.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-alcohol',
  imports: [
    NgxSpinnerComponent, 
    AlertComponent, 
    ListDrinksComponent, 
    SpinnerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alcohol.component.html',
  styleUrl: './alcohol.component.css'
})
export class AlcoholComponent implements OnDestroy {

  #alertService = inject(AlertService);
  #apiService = inject(ApiService);
  #spinner = inject(NgxSpinnerService);
  #paginationService = inject(PaginationService);

  //Arrays
  #listCategories = signal<AlcoholCategory[]>([]);
  listCategoriesComputed = computed(() => this.#listCategories())

  #listDrinks = signal<Alcohol[]>([]);
  listDrinksComputed = computed(() => this.#listDrinks())
 
  //boolean
  firstTime: boolean = false;

  arrivedDrinkMessage: AlertInfo = {
    message: 'Los cocktailes han sido generados',
    type: "correcto"
  }

  changedDrinkMessage: AlertInfo = {
    message: 'Los cocktailes han sido cambiados',
    type: "cambiado"
  }

  constructor(){
    this.handleListCategories();
  }

  ngOnDestroy(): void {
    this.#paginationService.reset();
    this.#alertService.reset();
  }

  handleListCategories(){
    this.#spinner.show();
    this.#apiService.getListAlcohol().subscribe({
      next: (response) => {
        this.#listCategories.set(response.drinks);
        this.#spinner.hide();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  private handleListDrinkByAlcohol(alcohol: string){
    this.#spinner.show();
    this.#apiService.getListDrinksByAlcohol(alcohol).subscribe(
      {
        next: (response) => {
          this.#listDrinks.set(response.drinks);
          this.handleAlerts();
          this.#paginationService.loadItems(this.#listDrinks());
          this.#spinner.hide();
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  actionButton(alcohol: string){
    this.#paginationService.reset();
    this.handleListDrinkByAlcohol(alcohol);
    this.activateCategory(alcohol);
  }

  private handleAlerts(){
    if(!this.firstTime){
      this.firstTime = true;
      this.#alertService.showAlertAndHide(this.arrivedDrinkMessage)
    }else{
      this.#alertService.showAlertAndHide(this.changedDrinkMessage)
    }
  }

  private activateCategory(alcohol: string){
    const div = document.getElementById(alcohol);
    div?.classList.remove("text-custom-violet");
    div?.classList.add("bg-custom-violet", "text-white");
    this.desactivateOtherCategories(alcohol);
  }

  private desactivateOtherCategories(alcohol: string){
    const categories = document.getElementsByClassName("categories");
    for (let index = 0; index < categories.length; index++) {
      if(alcohol != categories[index].id){
        const div = document.getElementById(categories[index].id)
        div?.classList.add("text-custom-violet");
        div?.classList.remove("bg-custom-violet", "text-white");
      }
    }
  }
}
