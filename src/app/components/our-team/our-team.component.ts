import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Section } from '../../types/appSections';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { MIconComponent } from '../../generic-components/m-icon/m-icon.component';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEmployeesSharepoint } from '../../interfaces/IEmployeesSharepoint.interface';
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
  public isLoading : boolean = true;

  constructor(private readonly httpClient:HttpClient) {}

  ngOnInit(): void {
    this.setCarouselOptions();

    employessData.employeeInfo.map(e => {

      const newEmployee : IEmployee = {
        title: e.infoContent.name,
        subtitle: e.infoContent.position,
        description: `<h4>BIO</h4> <p> <b>Career:</b> ${e.infoContent.carreer}</p> <p> <b>Expert in:</b> ${e.infoContent.expert} </p> <p> <b>Hobby:</b> ${e.infoContent.hobby} </p>`,
        image: e.attatchmentContent.$content,
        showDescription: false,
        animate: true,
        actionText: 'See more...'
      }

      this.employees.push(newEmployee);
    });

    this.isLoading = false;

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
