import { Component, Input } from '@angular/core';
import { OtherInformation } from '@interfaces/otherInformation';

@Component({
  selector: 'app-other-information',
  imports: [],
  templateUrl: './other-information.component.html',
  styleUrl: './other-information.component.css'
})
export class OtherInformationComponent {
  @Input({required: true}) otherInformation!: OtherInformation;
}
