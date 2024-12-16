import { ChangeDetectionStrategy, Component, computed, effect, inject, OnDestroy, OnInit, Signal, signal } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  templateUrl: './random.component.html',
  styleUrl: './random.component.css'
})
export class RandomComponent implements OnDestroy{

  #alertService = inject(AlertService);
  #apiService = inject(ApiService);
  #spinner = inject(NgxSpinnerService);

  #drink = signal<Drink | undefined>(undefined);
  drinkComputed = computed(() => this.#drink());

  firstTime: boolean = false;

  arrivedDrinkMessage: AlertInfo = {
    message: 'El cocktail ha sido generado',
    type: "correcto"
  }


  changedDrinkMessage: AlertInfo = {
    message: 'El cocktail ha sido cambiado',
    type: "cambiado"
  }

  deletedDrinkMessage: AlertInfo = {
    message: 'El cocktail ha sido eliminado',
    type: "eliminado"
  }

  ngOnDestroy(): void {
    this.#alertService.reset();
  }

  fecthRandomDrink(alertMessage: string){
    this.#spinner.show();
    this.#apiService.getRandom().subscribe(
      {
        next: (response) => {
          this.#drink.set(response.drinks[0]);
          this.handleAlerts();
          this.#spinner.hide();
        },
        error: (value) => {
          console.log(value);
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

  handleDeleteDrink(){
    this.#drink.set(undefined);
    this.#alertService.showAlertAndHide(this.deletedDrinkMessage);
  }
}
