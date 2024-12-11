import { Component } from '@angular/core';
import { HeroComponent } from '../../components/home/hero/hero.component';
import { FeaturesComponent } from "../../components/home/features/features.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, FeaturesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
