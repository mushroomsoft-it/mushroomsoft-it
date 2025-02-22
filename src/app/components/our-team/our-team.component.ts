import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Section } from '../../types/appSections';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { MIconComponent } from '../../generic-components/m-icon/m-icon.component';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../observables/navigation.service';
import { IEmployee } from '../../interfaces/IEmployee.interface';
import employessData from '../../config/employees.json';

const TIMEOUT_STEP_MILLISECONDS = 350;

@Component({
  selector: 'our-team',
  standalone: true,
  imports: [CarouselModule, CommonModule, MIconComponent],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.scss',
})
export class OurTeamComponent implements OnInit, OnDestroy {
  @Input() ourTeamData!: Section;
  @Input() locationData!: Section;
  public ourTeamCarouselOptions!: OwlOptions;
  public animationDone = false;
  private subscription!: Subscription;

  public employees : IEmployee[] = [];

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.setCarouselOptions();

    this.subscription = this.navigationService.languageObservable.subscribe(
      (language) => {
        this.employees  = employessData.map(e => e[language ?? 'en']);
      }
    );

    this.registerScrollEvent();
  }

  public animateList() {
    if (this.animationDone) {
      return;
    }

    let timeout = 0;
    this.ourTeamData.catalog!.map((item) => {
      item.animate = undefined;
      setTimeout(() => {
        item.animate = true;
      }, timeout);

      timeout += TIMEOUT_STEP_MILLISECONDS;
    });
    this.animationDone = true;
  }

  public registerScrollEvent(): void {
    window.addEventListener('scroll', async () => {
      const section = document.getElementById(this.ourTeamData.id!);
      if (
        window.scrollY >=
        section?.offsetTop! - section?.offsetHeight! / 1.75
      ) {
        this.animateList();
      }
    });
  }

  private setCarouselOptions() {
    this.ourTeamCarouselOptions = {
      dots: true,
      nav: false,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        800: {
          items: 3,
        },
        1000: {
          items: 4,
        },
      },
    };
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
