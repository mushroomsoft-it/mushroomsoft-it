import { Component, Input } from '@angular/core';
import { MIconComponent } from '../../generic-components/m-icon/m-icon.component';
import { CommonModule } from '@angular/common';
import { SectionLink } from '../../types/appSections';

@Component({
  selector: '[m-contact-links]',
  standalone: true,
  imports: [MIconComponent, CommonModule],
  templateUrl: './m-contact-links.component.html',
  styleUrl: './m-contact-links.component.scss',
})
export class MContactLinksComponent {
  @Input() linkList!: SectionLink[];
}
