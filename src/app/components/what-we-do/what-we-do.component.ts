import { Component, Input } from '@angular/core';
import { Section } from '../../types/appSections';

@Component({
  selector: 'what-we-do',
  standalone: true,
  imports: [],
  templateUrl: './what-we-do.component.html',
  styleUrl: './what-we-do.component.scss',
})
export class WhatWeDoComponent {
  @Input() sectionData!: Section;
}
