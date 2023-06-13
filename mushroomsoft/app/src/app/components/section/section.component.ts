import {Component, OnInit} from '@angular/core';
const jsonData = require('./data.json')
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  public sectionDescription: any = '';
  public sectionItems: any = '';
  public sectionsItems: any = '';

  constructor() {}

  ngOnInit() {
    this.sectionItems = jsonData.structure;
    this.sectionsItems = jsonData.structure.sections;
    this.sectionDescription = jsonData.structure.section.description;
  }
}
