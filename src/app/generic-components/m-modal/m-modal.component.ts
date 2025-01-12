import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MIconComponent } from '../m-icon/m-icon.component';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../observables/navigation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'm-modal',
  standalone: true,
  imports: [MIconComponent, CommonModule],
  templateUrl: './m-modal.component.html',
  styleUrl: './m-modal.component.scss',
})
export class MModalComponent implements AfterViewInit {
  public showModal = false;

  constructor(private navigationService: NavigationService) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.showModal = true;
    }, 100);
  }

  public closeModal() {
    this.showModal = false;
    setTimeout(() => {
      this.navigationService.showHideModal(false);
    }, 300);
  }
}
