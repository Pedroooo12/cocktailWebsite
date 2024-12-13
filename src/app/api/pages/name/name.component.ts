import { Component, computed, effect, HostListener, inject, signal } from '@angular/core';
import { AlertInfo } from '@interfaces/alertInfo';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { PaginationService } from '../../services/pagination.service';
import { Alcohol } from '@interfaces/alcohol/alcohol';
import { IdService } from '../../services/id.service';
import { Router } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { SearchComponent } from '../../components/search/search.component';
import { ListDrinksComponent } from '../../shared/list-drinks/list-drinks.component';
import { AlcoholResponse } from '@interfaces/alcohol/alcoholResponse';

@Component({
  selector: 'app-name',
  imports: [
    NgxSpinnerComponent,
    SpinnerComponent,
    AlertComponent,
    SearchComponent,
    ListDrinksComponent
  ],
  templateUrl: './name.component.html',
  styleUrl: './name.component.css',
})
export class NameComponent {
  #alertService = inject(AlertService);
  #apiService = inject(ApiService);
  #paginationService = inject(PaginationService);
  #spinner = inject(NgxSpinnerService);
  #idService = inject(IdService);
  #router = inject(Router);

  #alertMessage: string = '';

  #alertEffect = effect(() => {
    this.#alertMessage = this.#alertService.getAlert()();
    this.checkAlertMessage(this.#alertMessage);
  });

  #listDrinks = signal<Alcohol[]>([]);
  listDrinksComputed = computed(() => this.#listDrinks());

  firstTime: boolean = false;

  arrivedDrinkAlert: boolean = false;
  arrivedDrinkMessage: AlertInfo = {
    condition: this.arrivedDrinkAlert,
    mainMessage: 'Los cocktailes han sido generados',
    type: 'correcto',
  };

  changedDrinkAlert: boolean = false;
  changedDrinkMessage: AlertInfo = {
    condition: this.changedDrinkAlert,
    mainMessage: 'Los cocktailes han sido cambiados',
    type: 'cambiado',
  };

  noExistDrink: boolean = false;

  constructor(){

  }


  ngOnDestroy(): void {
    this.#paginationService.reset();
    this.#alertService.reset();
    this.#alertEffect.destroy();
  }

  checkAlertMessage(alert: string){
    switch (alert) {
      case 'creado':
        this.#alertService.showAlertAndHide(() => this.arrivedDrinkMessage.condition = !this.arrivedDrinkMessage.condition)
        break;
      case 'cambiado':
        this.#alertService.showAlertAndHide(() => this.changedDrinkMessage.condition = !this.changedDrinkMessage.condition)
        break;
    }
  }

  private handleAlerts(){
    if(!this.firstTime){
      this.firstTime = true;
      this.#alertService.reset();
      this.#alertService.setAlert("creado");
    }else{
      this.#alertService.reset();
      this.#alertService.setAlert("cambiado");
    }
  }

  fecthListDrinks(value: string){
    console.log(value);

    if(value == ""){
      this.resetChanges();
      this.firstTime = false;
    }else{
      this.#spinner.show();
      console.log(value);
      this.#apiService.getDrinksBySearch(value.toString()).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.#spinner.hide();
            if (response.drinks == null) {
              this.resetChanges();
              this.noExistDrink = true;
            } else{
              this.handleAlerts();
              if (this.#listDrinks().length > 0) {
                console.log("entra al listDrinks");
                this.handleListDrinkCondition(response);
              } else if (response.drinks.length > 0) {
                console.log("entra al responseDrinks");
                this.handleResponseDrinkCondition(response);
              }
            }
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
    }
  }

  handleListDrinkCondition(response:AlcoholResponse){
    this.noExistDrink = false;
    this.#paginationService.reset();
    this.#listDrinks.set(response.drinks);
    this.#paginationService.loadItems(this.#listDrinks());
  }

  handleResponseDrinkCondition(response: AlcoholResponse){
    this.noExistDrink = false;
    this.#listDrinks.set(response.drinks);
    this.#paginationService.loadItems(this.#listDrinks());
  }

  resetChanges(){
    this.#listDrinks.set([])
    this.#paginationService.reset();
  }

  redirectDrink(id: number){
    this.#router.navigate(["/bebida"]);
    this.#idService.setId(id);
  }
}
