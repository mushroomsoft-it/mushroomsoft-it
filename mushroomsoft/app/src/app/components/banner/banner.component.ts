import {Component, OnInit} from '@angular/core';
const jsonData = require('./data.json')
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  public sectionItems: any = '';
  public sectionTitle: string = '';
  public sectionImage: string = '';

  constructor() {}

  ngOnInit() {
    this.sectionTitle = jsonData.structure.section.title;
    this.sectionItems = jsonData.structure.section.items;
    this.sectionImage = jsonData.structure.section.img;
  }
}
