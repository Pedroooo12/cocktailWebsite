import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  
  #id = signal<number>(-1);


  
  constructor() { }
  getId(){
    //añadimos asObservable para que no se pueda modificar desde el get
    return	this.#id();
  }

  setId(id: number){
    this.#id.set(id);
  }
}
