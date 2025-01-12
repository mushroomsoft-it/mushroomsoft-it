import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { sleep } from '../../utils/utils';

@Component({
  selector: '[m-animated-header]',
  standalone: true,
  imports: [],
  templateUrl: './m-animated-header.component.html',
  styleUrl: './m-animated-header.component.scss',
})
export class MAnimatedHeaderComponent implements OnChanges {
  @Input() numericalTitle!: number;
  @Input() unit!: string;
  @Input() startAnimation!: boolean;
  public title!: string;

  public async animateTitle() {
    for (let i = 1; i <= this.numericalTitle; i++) {
      this.title = `${i}${this.unit}`;
      await sleep(20);
    }
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    for (let property in changes) {
      if (property == 'startAnimation' && changes[property].currentValue) {
        await this.animateTitle();
      }
    }
  }
}
