import { Component, Input } from '@angular/core';
import { Accordion } from '@interfaces/accordion';

@Component({
  selector: 'app-accordion',
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  @Input({required: true}) accordionList!: Accordion[];
  openIndexes: Set<number> = new Set();

  toggle(index: number){
    if (this.openIndexes.has(index)) {
      this.openIndexes.delete(index);
    } else {
      this.openIndexes.add(index);
    }
  }

  isOpen(index: number): boolean {
    return this.openIndexes.has(index);
  }
}
