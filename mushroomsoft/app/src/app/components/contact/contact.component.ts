import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFormOptions, FormlyFieldConfig} from '@ngx-formly/core';
const jsonData = require('./data.json')
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  form = new FormGroup({});
  model: {} = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [];
  constructor() {}

  ngOnInit() {
    this.fields = jsonData.structure;
  }
  submit() {
    alert(JSON.stringify(this.model));
  }
}
