import {Component, OnInit} from '@angular/core';
const jsonData = require('./data.json');

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public commitmentItems: any = '';

  constructor() {}

  ngOnInit() {
    this.commitmentItems = jsonData.structure.items;
  }
}
