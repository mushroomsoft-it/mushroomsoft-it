import { Component } from '@angular/core';
import { BROCHURE_EXTERNAL_URL } from '../../constants/brochure.constants';
import { SafeUrlPipe } from '../../safe-url.pipe';

@Component({
  selector: 'app-brochure',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './brochure.component.html',
  styleUrl: './brochure.component.scss',
})
export class BrochureComponent {
  public readonly brochureUrl = BROCHURE_EXTERNAL_URL;
}
