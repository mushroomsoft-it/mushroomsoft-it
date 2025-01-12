import { Component, Input } from '@angular/core';
import { MIconComponent } from '../../generic-components/m-icon/m-icon.component';
import { Section } from '../../types/appSections';
import { NavigationService } from '../../observables/navigation.service';

@Component({
  selector: 'main-section',
  standalone: true,
  imports: [MIconComponent],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss',
})
export class MainSectionComponent {
  @Input() sectionData!: Section;

  constructor(private navigationService: NavigationService) {}

  public openModal() {
    this.navigationService.showHideModal(true);
  }
}
