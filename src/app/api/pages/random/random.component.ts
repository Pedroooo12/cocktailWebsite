import { Component, computed, effect, inject, OnDestroy, OnInit, Signal, signal } from '@angular/core';
import { AlertInfo } from '@interfaces/alertInfo';
import { Drink } from '@interfaces/drink';
import { AlertComponent } from '../../shared/alert/alert.component';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DrinkDetailsComponent } from "../../components/drink-details/drink-details.component";
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-random',
  imports: [
    DrinkDetailsComponent, 
    AlertComponent,
    SpinnerComponent,
    NgxSpinnerComponent
  ],
  standalone: true,
  templateUrl: './random.component.html',
  styleUrl: './random.component.css'
})
export class RandomComponent implements OnDestroy{

  #alertService = inject(AlertService);
  #apiService = inject(ApiService);
  #spinner = inject(NgxSpinnerService);

  #drink = signal<Drink | undefined>(undefined);
  drinkComputed = computed(() => this.#drink())

  #alertMessage: string = '';

  #alertEffect = effect(() => {
    this.#alertMessage = this.#alertService.getAlert()();
    this.checkAlertMessage(this.#alertMessage);
  });

  arrivedDrinkAlert: boolean = false;
  arrivedDrinkMessage: AlertInfo = {
    condition: this.arrivedDrinkAlert,
    mainMessage: 'El cocktail ha sido generado',
    type: "correcto"
  }

  changedDrinkAlert: boolean = false;
  changedDrinkMessage: AlertInfo = {
    condition: this.changedDrinkAlert,
    mainMessage: 'El cocktail ha sido cambiado',
    type: "cambiado"
  }

  deletedDrinkAlert: boolean = false;
  deletedDrinkMessage: AlertInfo = {
    condition: this.deletedDrinkAlert,
    mainMessage: 'El cocktail ha sido eliminado',
    type: "eliminado"
  }

  ngOnDestroy(): void {
    this.#alertEffect.destroy();
    this.#alertService.reset();
  }

  handleRandom(alertMessage: string){
    this.#spinner.show();
    this.#apiService.getRandom().subscribe(
      {
        next: (response) => {
          this.#drink.set(response.drinks[0]);
          this.#alertService.setAlert(alertMessage);
          this.#spinner.hide();
        },
        error: (value) => {
          console.log(value);
        }
      }
    )
  }

  checkAlertMessage(alert: string){
    switch (alert) {
      case 'aleatorio':
        this.#alertService.showAlertAndHide(() => this.arrivedDrinkMessage.condition = !this.arrivedDrinkMessage.condition)
        break;
      case 'cambiado':
        this.#alertService.showAlertAndHide(() => this.changedDrinkMessage.condition = !this.changedDrinkMessage.condition)
        break;
      case 'eliminado':
        this.#alertService.showAlertAndHide(() => this.deletedDrinkMessage.condition = !this.deletedDrinkMessage.condition)
        break;
    }
  }

  deleteRandom(){
    this.#drink.set(undefined);
    this.#alertService.setAlert("eliminado");
  }
}
