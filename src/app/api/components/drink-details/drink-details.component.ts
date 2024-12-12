import { Component, Input } from '@angular/core';
import { Accordion } from '@interfaces/accordion';
import { Drink } from '@interfaces/drink';
import { Ingredient } from '@interfaces/ingredient';
import { OtherInformation } from '@interfaces/otherInformation';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AccordionComponent } from './accordion/accordion.component';
import { OtherInformationComponent } from './other-information/other-information.component';

@Component({
  selector: 'app-drink-details',
  imports: [IngredientsComponent, AccordionComponent, OtherInformationComponent],
  templateUrl: './drink-details.component.html',
  styleUrl: './drink-details.component.css'
})
export class DrinkDetailsComponent {

  @Input({required: true}) drink!: Drink;
  @Input() noTitle?: boolean;

  getAccordionList(): Accordion[] {
    // Comprobar cada instrucción y hacer push si existe y no es null
    var accordionList: Accordion[] = [];
    if (this.drink.strInstructions) {
      accordionList.push({title: "Instrucciones (EN):",  description: this.drink.strInstructions});
    }
    if (this.drink.strInstructionsDE) {
      accordionList.push({title: "Instrucciones (DE):",  description: this.drink.strInstructionsDE});
    }
    if (this.drink.strInstructionsES) {
      accordionList.push({title: "Instrucciones (ES):",  description: this.drink.strInstructionsES});
    }
    if (this.drink.strInstructionsFR) {
      accordionList.push({title: "Instrucciones (FR):",  description: this.drink.strInstructionsFR});
    }
    if (this.drink.strInstructionsIT) {
      accordionList.push({title: "Instrucciones (IT):",  description: this.drink.strInstructionsIT});
    }
    if (this.drink.strInstructionsZH_HANS) {
      accordionList.push({title: "Instrucciones (HANS):",  description: this.drink.strInstructionsZH_HANS});
    }
    if (this.drink.strInstructionsZH_HANT) {
      accordionList.push({title: "Instrucciones (HANT):",  description: this.drink.strInstructionsZH_HANT});
    }
    return accordionList;
  }

  getIngredientList(): Ingredient[]{
    var ingredientList: Ingredient[] = [];

    for (let index = 1; index <= 15; index++) {
      const ingredient = this.drink[`strIngredient${index}`];
      const measure = this.drink[`strMeasure${index}`];

      if (ingredient && measure) {
        ingredientList.push({
          step: `Ingrediente ${index}:`,
          ingredient: ingredient,
          quantity: measure
        });
      }
    }

    return ingredientList;
  }

  getOtherInformation(): OtherInformation{
    var otherInformationList: OtherInformation = {
      strTags: this.drink.strTags ?? 'No disponible',
      strVideo: this.drink.strVideo ?? 'No disponible',
      strImageSource: this.drink.strImageSource ?? 'No disponible',
      strCreativeCommonsConfirmed: this.drink.strCreativeCommonsConfirmed ?? 'No',
      strImageAttribution: this.drink.strImageAttribution ?? 'No disponible',
      dateModified: this.drink.dateModified ?? 'No disponible'
    };
    return otherInformationList;
  }
}
