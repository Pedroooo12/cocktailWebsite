import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [],
  standalone: true,
   changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  passValue = output<string>();
  noExistDrink = input<boolean>();

  private debouncer: Subject<String> = new Subject<String>();

  constructor() { }

  ngOnInit() {
      this.debouncer.pipe(
        debounceTime(400)
      ).subscribe(value => {
        console.log(value);
        this.passValue.emit(value.toString());
      });
  }

  onKeyPress(textoRecogido: String){
    this.debouncer.next(textoRecogido);
  }
}
