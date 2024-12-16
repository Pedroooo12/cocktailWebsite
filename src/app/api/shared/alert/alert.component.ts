import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject,} from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  alertService = inject(AlertService);

  constructor(){
  }


  getClass(){
    switch (this.alertService.getAlert()().type) {
      case 'eliminado':
        return 'border-red-700  text-red-100 bg-red-600 hover:bg-red-800';
      case 'correcto':
        return 'border-green-700  text-green-100 bg-green-600 hover:bg-green-800';
      case 'cambiado':
        return 'border-blue-700  text-blue-100 bg-blue-600 hover:bg-blue-800';
      default:
        return ''
    }
  }
}
