import {Component, OnInit} from '@angular/core';
const jsonData = require('./data.json');
@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
})
export class TechnologyComponent implements OnInit {
  public titleTechnology: string = '';
  public descriptionTechnology: string = '';
  public technologyItemsService: any = '';
  public technologyItemsImage = [];
  public technologyItems: any = '';
  constructor() {}

  ngOnInit() {
    this.technologyItems = jsonData.structure;
    this.titleTechnology = this.technologyItems.title.title;
    this.descriptionTechnology = this.technologyItems.title.description;
    this.technologyItemsService = this.technologyItems.service;
    this.technologyItemsService.map((res: any) => {
      this.technologyItemsImage = res.images as [];
    });
  }
}
