import { Component, Input } from '@angular/core';
import { Ingredient } from '@interfaces/ingredient';

@Component({
  selector: 'app-ingredients',
  imports: [],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {
  @Input({required: true}) ingredientList!: Ingredient[];
}
