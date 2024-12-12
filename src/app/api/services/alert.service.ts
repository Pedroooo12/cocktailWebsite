import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // Definimos una señal para manejar la información
  #information = signal<string>(''); // Inicializamos con una cadena vacía

  constructor() { }

  // Método para obtener la señal
  getAlert() {
    return this.#information;
  }

  // Método para establecer la alerta
  setAlert(information: string) {
    this.#information.set(information);
  }

  showAlertAndHide(setAlert: () => void): void {
    setAlert(); 
    setTimeout(() => {
      setAlert();
    }, 1500);
  }
}
