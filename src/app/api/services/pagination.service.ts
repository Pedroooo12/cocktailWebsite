import { Injectable, signal } from '@angular/core';
import { Alcohol } from '@interfaces/alcohol/alcohol';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private items: Alcohol[] = [];
  private currentPage: number = 0;
  private pageSize: number = 10;
  private displayedItems = signal<Alcohol[]>([]);

  constructor() {
    this.setPageSizeBasedOnScreenWidth();
  }

  setPageSizeBasedOnScreenWidth() {
    const screenWidth = window.innerWidth;
  
    if (screenWidth < 600) {
      this.pageSize = 5;
    } else if (screenWidth >= 600 && screenWidth < 1200) {
      this.pageSize = 10; 
    } else {
      this.pageSize = 20; 
    }
  }

  loadItems(items: Alcohol[]) {
    this.items = items;
    this.currentPage = 0; // Reiniciar la página al cargar nuevos elementos
    this.updateDisplayedItems();
  }

  loadMore() {
    this.currentPage++;
    this.updateDisplayedItems();
  }

  getDisplayedItems() {
    return this.displayedItems();
  }

  private updateDisplayedItems() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    const newItems = this.items.slice(startIndex, endIndex);
    const currentDisplayed = this.displayedItems();
    this.displayedItems.update(() => [...currentDisplayed, ...newItems]);
  }

  reset() {
    this.currentPage = 0;
    this.displayedItems.set([]);
  }
}
