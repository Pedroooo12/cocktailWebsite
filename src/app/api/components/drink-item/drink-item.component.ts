import { Component, Input } from '@angular/core';
import { Alcohol } from '@interfaces/alcohol/alcohol';

@Component({
  selector: 'app-drink-item',
  imports: [],
  templateUrl: './drink-item.component.html',
  styleUrl: './drink-item.component.css'
})
export class DrinkItemComponent {
  @Input({required: true}) alcohol!: Alcohol;
}
