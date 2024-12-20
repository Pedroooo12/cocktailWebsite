import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { Alcohol } from '@interfaces/alcohol/alcohol';

@Component({
  selector: 'app-drink-item',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './drink-item.component.html',
  styleUrl: './drink-item.component.css'
})
export class DrinkItemComponent {
  alcohol = input.required<Alcohol>();
}
