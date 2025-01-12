import { AfterViewInit, Component, Input } from '@angular/core';
import { Section } from '../../types/appSections';
import { NavigationService } from '../../observables/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cookies-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookies-banner.component.html',
  styleUrl: './cookies-banner.component.scss',
})
export class CookiesBannerComponent implements AfterViewInit {
  @Input() sectionData!: Section;
  public showCookiesBanner!: boolean;

  constructor(private navigationService: NavigationService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showCookiesBanner = true;
    }, 100);
  }

  public acceptOlyNecessaryCookies() {
    this.closeBanner();
  }

  public acceptAllCookies() {
    this.closeBanner();
  }

  private closeBanner() {
    this.showCookiesBanner = false;
    setTimeout(() => {
      this.navigationService.showHideCookiesBanner(false);
    }, 300);
  }
}
