import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Section } from '../../types/appSections';
import { MIconComponent } from '../../generic-components/m-icon/m-icon.component';
import { MContactLinksComponent } from '../../generic-components/m-contact-links/m-contact-links.component';

@Component({
  selector: 'info-footer',
  standalone: true,
  imports: [CommonModule, MIconComponent, MContactLinksComponent],
  templateUrl: './info-footer.component.html',
  styleUrl: './info-footer.component.scss',
})
export class InfoFooterComponent {
  @Input() servicesData!: Section;
  @Input() locationData!: Section;

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
