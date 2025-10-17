import { Component } from '@angular/core';
import { JOINUS_EXTERNAL_URL } from '../../constants/joinus.constants';
import { SafeUrlPipe } from '../../safe-url.pipe';

@Component({
  selector: 'app-joinus',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './joinus.component.html',
  styleUrl: './joinus.component.scss',
})
export class JoinusComponent {
  public readonly joinusUrl = JOINUS_EXTERNAL_URL;
}
