import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, signal } from '@angular/core';
import { Alcohol } from '@interfaces/alcohol/alcohol';
import { AlertInfo } from '@interfaces/alertInfo';
import { Glass } from '@interfaces/glass';
import { AlertService } from '../../services/alert.service';
import { PaginationService } from '../../services/pagination.service';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../services/api.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { ListDrinksComponent } from '../../shared/list-drinks/list-drinks.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-glass',
  imports: [
    AlertComponent, 
    NgxSpinnerComponent, 
    ListDrinksComponent,
    SpinnerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './glass.component.html',
  styleUrl: './glass.component.css'
})
export class GlassComponent implements OnDestroy{

  #alertService = inject(AlertService);
  #apiService = inject(ApiService);
  #paginationService = inject(PaginationService);
  #spinner = inject(NgxSpinnerService);



  #listGlass = signal<Glass[]>([]);
  listGlassComputed = computed(() => this.#listGlass())
  
  #listDrinks = signal<Alcohol[]>([]);
  listDrinksComputed = computed(() => this.#listDrinks());

  firstTime: boolean = false;

  selectedValue: string = "";


  //alerts
  arrivedDrinkMessage: AlertInfo = {
    message: 'Los cocktailes han sido generados',
    type: "correcto"
  }

  changedDrinkMessage: AlertInfo = {
    message: 'Los cocktailes han sido cambiados',
    type: "cambiado"
  }

  constructor(){
    this.fecthListGlass();
  }

  ngOnDestroy(): void {
    this.#paginationService.reset();
    this.#alertService.reset();
  }

  fecthListGlass(){
    this.#spinner.show();
    this.#apiService.getListGlass().subscribe(
      {
        next: (response) => {
          this.#listGlass.set(response.drinks);
          this.#spinner.hide();
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  private handleAlerts(){
    if(!this.firstTime){
      this.firstTime = true;
      this.#alertService.showAlertAndHide(this.arrivedDrinkMessage);
    }else{
      this.#alertService.showAlertAndHide(this.changedDrinkMessage);
    }
  }

  fetchListDrinks(){
    this.#spinner.show();
    if(this.selectedValue != ""){
      this.#apiService.getListDrinksByGlass(this.selectedValue).subscribe(
        {
          next: (response) => {
            this.#listDrinks.set(response.drinks);
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

  getValueFromSelect(event: any){
    const selectElement = event.target as HTMLSelectElement; // Asegúrate de que el evento es del tipo correcto
    this.selectedValue = selectElement.value; 
    if(this.#listDrinks().length > 0) this.resetDrinks();
    this.fetchListDrinks();
  }

  resetDrinks(){
    this.#paginationService.reset();
    this.#listDrinks.set([]);
  }

}
