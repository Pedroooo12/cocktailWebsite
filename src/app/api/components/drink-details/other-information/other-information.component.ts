import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { OtherInformation } from '@interfaces/otherInformation';

@Component({
  selector: 'app-other-information',
  imports: [],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './other-information.component.html',
  styleUrl: './other-information.component.css'
})
export class OtherInformationComponent {
  otherInformation = input.required<OtherInformation>();
}
