import { Component, Input, OnInit } from '@angular/core';
import { Section } from '../../types/appSections';
import { CommonModule } from '@angular/common';
import { MAnimatedHeaderComponent } from '../../generic-components/m-animated-header/m-animated-header.component';
import { SCROLL_OFFSET_FACTOR } from '../../utils/utils';

const TIMEOUT_STEP_MILLISECONDS = 600;

@Component({
  selector: 'statistics',
  standalone: true,
  imports: [CommonModule, MAnimatedHeaderComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  @Input() sectionData!: Section;
  private animationDone = false;

  ngOnInit(): void {
    this.registerScrollEvent();
  }

  public getNumericalTitle(title: string): number {
    return parseInt(title!.substring(0, title!.length - 1));
  }

  public getUnit(title: string): string {
    return title!.substring(title!.length - 1);
  }

  public animateList() {
    if (this.animationDone) {
      return;
    }

    let timeout = 0;
    this.sectionData.catalog!.map((item) => {
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
      const section = document.getElementById('statistics');
      if (
        window.scrollY >=
        section?.offsetTop! - section?.offsetHeight! * SCROLL_OFFSET_FACTOR
      ) {
        this.animateList();
      }
    });
  }
}
