import { Component, Input, OnInit } from '@angular/core';
import { Section } from '../../types/appSections';
import { MIconComponent } from '../../generic-components/m-icon/m-icon.component';
import { NavigationService } from '../../observables/navigation.service';
import { GET_IN_TOUCH_EXTERNAL_URL } from '../../constants/getintouch.constants';

@Component({
  selector: 'dreams',
  standalone: true,
  imports: [MIconComponent],
  templateUrl: './dreams.component.html',
  styleUrl: './dreams.component.scss',
})
export class DreamsComponent implements OnInit {
  @Input() sectionData!: Section;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.registerScrollEvent();
  }

  public registerScrollEvent() {
    window.addEventListener('scroll', () => {
      const section = document.getElementById('dreams');
      if (
        window.scrollY >=
        section?.offsetTop! - section?.offsetHeight! * 1.75
      ) {
        const sectionTitle = section?.querySelector(
          '.m-section--dreams__label'
        );
        sectionTitle!.classList.add('m-right-to-left');
        sectionTitle!.classList.add('m-right-to-left--inverse');
        sectionTitle!.classList.add('m-right-to-left__no-delay');

        const sectionLink = section?.querySelector(
          '.m-section--dreams__btn_group'
        );
        sectionLink!.classList.add('m-right-to-left');
        sectionLink!.classList.add('m-right-to-left--inverse');
      }
    });
  }

  public openGetInTouch() {
    window.open(GET_IN_TOUCH_EXTERNAL_URL, '_blank', 'noopener,noreferrer');
  }
  
}
