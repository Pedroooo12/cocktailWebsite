import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  
  #id = signal<number>(-1);


  
  constructor() { }
  getId(){
    return	this.#id();
  }

  setId(id: number){
    this.#id.set(id);
  }
}
