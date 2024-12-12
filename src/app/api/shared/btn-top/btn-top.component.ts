import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-top',
  imports: [],
  templateUrl: './btn-top.component.html',
  styleUrl: './btn-top.component.css'
})
export class BtnTopComponent {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
