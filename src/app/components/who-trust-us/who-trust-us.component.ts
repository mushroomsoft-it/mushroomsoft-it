import { Component, Input, OnInit } from '@angular/core';
import { MIconComponent } from '../../generic-components/m-icon/m-icon.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Section } from '../../types/appSections';

@Component({
  selector: 'who-trust-us',
  standalone: true,
  imports: [MIconComponent, CarouselModule],
  templateUrl: './who-trust-us.component.html',
  styleUrl: './who-trust-us.component.scss',
})
export class WhoTrustUsComponent implements OnInit {
  @Input() sectionData!: Section;
  public brandsCarouselOptions!: OwlOptions;

  ngOnInit(): void {
    this.brandsCarouselOptions = {
      dots: true,
      nav: false,
      responsive: {
        0: {
          items: 2,
        },
        600: {
          items: 3,
        },
        800: {
          items: 4,
        },
      },
    };
  }
}
