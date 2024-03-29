import {Component, OnInit} from '@angular/core';
import {logoMushroomSoft, menuIcon} from '../../constants';
import {MainLibService} from '@mushroomsoft-lib';
const jsonData = require('./data.json');
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public element: boolean = false;
  public menuItems: any = '';
  public logo = logoMushroomSoft;
  public menuIcon = menuIcon;

  constructor(private libService: MainLibService) {}

  ngOnInit() {
    this.getForm();
  }

  getForm() {
    this.menuItems = jsonData;
  }

  checked() {
    this.element = true;
  }

  notChecked() {
    this.element = !this.element as boolean;
  }
}
