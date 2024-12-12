import { Component, effect, inject } from '@angular/core';
import { Drink } from '@interfaces/drink';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BtnBackComponent } from '../../shared/btn-back/btn-back.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { DrinkDetailsComponent } from '../../components/drink-details/drink-details.component';
import { IdService } from '../../services/id.service';

@Component({
  selector: 'app-drink',
  imports: [
    BtnBackComponent,
    NgxSpinnerComponent,
    SpinnerComponent,
    DrinkDetailsComponent
  ],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.css'
})
export class DrinkComponent {

  #apiService = inject(ApiService);
  #idService = inject(IdService);
  #spinner = inject(NgxSpinnerService);
  #titleService = inject(Title);
  #router = inject(Router);

  drink!: Drink;
  arrivedDrink: boolean = false;
  id: number = -1;

  constructor(){
    this.#spinner.show();
    effect(() => {
      this.id = this.#idService.getId();
      (this.id === -1) ? this.back() : this.handleDrink(this.id);
    });
  }

  handleDrink(id:number){
    this.#spinner.show();
    this.#apiService.getDrinkById(id).subscribe(
      {
        next: (response) => {
          this.drink = response.drinks[0];
          this.#titleService.setTitle(this.drink.strDrink);
          this.arrivedDrink = true;
          this.#spinner.hide();
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  back(){
    this.#router.navigate(["/alcohol"]);
  }
}
