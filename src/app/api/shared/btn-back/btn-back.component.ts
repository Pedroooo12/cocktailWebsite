import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-btn-back',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './btn-back.component.html',
  styleUrl: './btn-back.component.css'
})
export class BtnBackComponent {

  goBack() {
    window.history.back();
  }
}
