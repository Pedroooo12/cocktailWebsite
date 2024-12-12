import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { DrinkResponse } from '@interfaces/drinkResponse';
import { AlcoholCategoryResponse } from '@interfaces/alcohol/alcoholCategoryResponse';
import { AlcoholResponse } from '@interfaces/alcohol/alcoholResponse';
import { GlassResponse } from '@interfaces/glassResponse';
import { IngredientResponse } from '@interfaces/ingredient/ingredientResponse';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  #apiUrl = environment.apiUrl;
  #http = inject(HttpClient);

  constructor() { }

  getApiUrl(){
    return this.#apiUrl;
  }

  getRandom(): Observable<DrinkResponse>{
    return this.#http.get<DrinkResponse>(`${this.#apiUrl}/random.php`);
  }

  getListAlcohol(): Observable<AlcoholCategoryResponse>{
    return this.#http.get<AlcoholCategoryResponse>(`${this.#apiUrl}/list.php?a=list`);
  }

  getListDrinksByAlcohol(alcohol: string): Observable<AlcoholResponse>{
    return this.#http.get<AlcoholResponse>(`${this.#apiUrl}/filter.php?a=${alcohol}`);
  }

  getDrinkById(id: number): Observable<DrinkResponse>{
    return this.#http.get<DrinkResponse>(`${this.#apiUrl}/lookup.php?i=${id}`);
  }

  getDrinksBySearch(text: string): Observable<AlcoholResponse>{
    return this.#http.get<AlcoholResponse>(`${this.#apiUrl}/search.php?s=${text}`);
  }

  getListGlass(): Observable<GlassResponse>{
    return this.#http.get<GlassResponse>(`${this.#apiUrl}/list.php?g=list`);
  }

  getListDrinksByGlass(glass: string): Observable<AlcoholResponse>{
    return this.#http.get<AlcoholResponse>(`${this.#apiUrl}/filter.php?g=${glass}`);
  }

  getListIngredients(): Observable<IngredientResponse>{
    return this.#http.get<IngredientResponse>(`${this.#apiUrl}/list.php?i=list`);
  }

  getListDrinksByIngredient(ingredient: string): Observable<AlcoholResponse>{  
    return this.#http.get<AlcoholResponse>(`${this.#apiUrl}/filter.php?i=${ingredient}`);
  }

}
