import { Component, Input } from '@angular/core';
import { Section } from '../../types/appSections';

@Component({
  selector: 'who-we-are',
  standalone: true,
  imports: [],
  templateUrl: './who-we-are.component.html',
  styleUrl: './who-we-are.component.scss',
})
export class WhoWeAreComponent {
  @Input() whoWeAreData!: Section;
  @Input() ourStoryData!: Section;
}
