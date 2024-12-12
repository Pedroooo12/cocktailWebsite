import { Component, input, Input } from '@angular/core';
import { Ingredient } from '@interfaces/ingredient';

@Component({
  selector: 'app-ingredients',
  imports: [],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {
  ingredientList = input.required<Ingredient[]>();
}
