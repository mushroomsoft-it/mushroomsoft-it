import { Component, Input, ViewChild, HostListener  } from '@angular/core';
import { MIconComponent } from '../../generic-components/m-icon/m-icon.component';
import { Section } from '../../types/appSections';
import { NavigationService } from '../../observables/navigation.service';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'main-section',
  standalone: true,
  imports: [MIconComponent, CarouselModule, CommonModule],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss',
})
export class MainSectionComponent {
  @Input() sectionData!: Section;
  @ViewChild('fullScreenCarousel') fullScreenCarousel?: CarouselComponent;

  isMobile = false;

  fullScreenCarouselOptions: OwlOptions = {
    loop: true,
    items: 1,
    dots: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 6000,
    autoplayHoverPause: true,
    smartSpeed: 800,
    animateOut: 'fadeOut',
    mouseDrag: true,
    touchDrag: true,
  };

  constructor(private navigationService: NavigationService) {}

  ngOnInit(): void {
    this.checkViewport();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkViewport();
  }

  private checkViewport() {
    this.isMobile = window.innerWidth < 768;
  }

  public openModal() {
    this.navigationService.showHideModal(true);
  }

  public handleCatalogClick(item: Section): void {
    if (!item) return;

    if (item.id === 'get-in-touch') {
      this.openModal();
      return;
    }

    const link = item.links?.[0]?.link;

    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    } else {
      return;
    }
  }

  getIcon(icon: string) {
    return icon;
  }

  trackById(index: number, item: Section): string | number {
    return item.id ?? index;
  }
}
