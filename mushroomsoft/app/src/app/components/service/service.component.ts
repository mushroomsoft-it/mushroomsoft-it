import {Component, OnInit} from '@angular/core';
import {MainLibService} from '@mushroomsoft-lib';
const jsonData = require('./data.json');
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  public serviceTitle: string = '';
  public serviceClass: string = '';
  public serviceItems: any = '';
  public servicesItems: any = '';

  constructor(private libService: MainLibService) {}

  ngOnInit() {
    this.serviceItems = jsonData.structure;
    this.servicesItems = jsonData.structure.services;
    this.serviceTitle = jsonData.structure.service.title;
    this.serviceClass = jsonData.structure.service.class;
  }
}
