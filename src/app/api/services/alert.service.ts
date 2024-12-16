import { ChangeDetectorRef, inject, Injectable, signal } from '@angular/core';
import { AlertInfo } from '@interfaces/alertInfo';
import { AlertSignal } from '@interfaces/alertSignal';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  #alert = signal<AlertSignal>({ message: '',type: '', visible: false });


  // Método para obtener la señal
  getAlert() {
    return this.#alert;
  }

  // Método para establecer la alerta
  setAlert(alert: AlertInfo) {
    this.#alert.set({ message: alert.message,type: alert.type, visible: true });
  }

  // Método para restablecer la alerta
  reset() {
    this.#alert.set({ message: '', type: '', visible: false });
  }

  // Método para mostrar la alerta y ocultarla después de un tiempo
  showAlertAndHide(alert: AlertInfo): void {
    console.log("entra");
    this.setAlert(alert);
    setTimeout(() => {
      this.reset();
      console.log(this.#alert())
    }, 1500);
  }
}
