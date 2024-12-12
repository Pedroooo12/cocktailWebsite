import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AlertInfo } from '@interfaces/alertInfo';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {

  @Input({required: true}) alertInfo!: AlertInfo;

  getClass(){
    switch (this.alertInfo!.type) {
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
