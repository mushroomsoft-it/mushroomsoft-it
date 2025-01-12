import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MIconComponent } from '../../generic-components/m-icon/m-icon.component';
import {
  CarouselComponent,
  CarouselModule,
  OwlOptions,
} from 'ngx-owl-carousel-o';
import { Section } from '../../types/appSections';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../observables/navigation.service';

@Component({
  selector: 'm-services',
  standalone: true,
  imports: [MIconComponent, CarouselModule, CommonModule],
  templateUrl: './m-services.component.html',
  styleUrl: './m-services.component.scss',
})
export class MServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sectionData!: Section;
  public servicesCarouselOptions!: OwlOptions;
  @ViewChild('servicesCarousel') servicesCarousel!: CarouselComponent;
  private subscription!: Subscription;

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.servicesCarouselOptions = {
      dots: false,
      nav: true,
      navText: [
        '<span class="m-section--services__prev"></span>',
        '<span class="m-section--services__next"></span>',
      ],
      loop: true,
      responsive: {
        0: {
          items: 1,
        },
        800: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    };

    this.subscription = this.navigationService.subMenuIdObservable.subscribe(
      (subMenuId: string | undefined) => {
        if (subMenuId) {
          this.servicesCarousel.to(subMenuId);
          this.navigationService.emitSubMenuId(undefined);
        }
      }
    );

    this.subscription.add(
      this.navigationService.languageObservable.subscribe(() => {
        setTimeout(() => {
          this.setCarouselNavButtonsStyle();
        }, 300);
      })
    );
  }

  ngAfterViewInit(): void {
    this.setCarouselNavButtonsStyle();
  }

  private setCarouselNavButtonsStyle() {
    const navPrev = document.querySelector('.m-section--services__prev');
    navPrev?.parentElement?.classList.add('m-section--services__slider-nav');
    const navNext = document.querySelector('.m-section--services__next');
    navNext?.parentElement?.classList.add('m-section--services__slider-nav');

    navPrev?.parentElement?.parentElement?.classList.add(
      'm-section--services__slider-wrapper'
    );
  }

  public getIcon(icon: string[] | string) {
    return icon as string;
  }

  public openModal() {
    this.navigationService.showHideModal(true);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
