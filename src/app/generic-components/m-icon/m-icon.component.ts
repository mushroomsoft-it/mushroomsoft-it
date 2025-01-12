import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'm-icon',
  standalone: true,
  templateUrl: './m-icon.component.html',
  styleUrl: './m-icon.component.scss',
})
export class MIconComponent implements OnInit {
  @Input() iconName!: string;
  safeIcon!: SafeHtml;

  constructor(
    private httpClient: HttpClient,
    private domSanitizer: DomSanitizer
  ) {}

  async ngOnInit(): Promise<void> {
    let rawSvg = await firstValueFrom(
      this.httpClient.get(`svg/${this.iconName}`, { responseType: 'text' })
    );
    this.safeIcon = this.domSanitizer.bypassSecurityTrustHtml(rawSvg);
  }
}
