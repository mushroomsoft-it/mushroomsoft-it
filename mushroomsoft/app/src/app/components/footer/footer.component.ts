import {Component, OnInit} from '@angular/core';
const jsonData = require('./data.json');

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public locationItems: any = '';
  public titleLocation: string = '';
  public descriptionLocation: string = '';
  public imageLocation: string = '';
  public titleAddress: string = '';
  public streetAddress: string = '';
  public locationAddress: string = '';
  public floorAddress: string = '';
  public phoneAddress: string = '';
  public socialGithub: string = '';
  public socialLinkedin: string = '';
  public socialClassImage: string = '';
  public logoFooterImage: string = '';
  public logoClassImage: string = '';

  constructor() {}

  ngOnInit() {
    this.locationItems = jsonData.structure;
    this.titleLocation = jsonData.structure.title.title;
    this.descriptionLocation = jsonData.structure.title.description;
    this.imageLocation = jsonData.structure.title.img;
    this.titleAddress = jsonData.structure.location.title;
    this.streetAddress = jsonData.structure.location.address;
    this.locationAddress = jsonData.structure.location.location;
    this.floorAddress = jsonData.structure.location.floor;
    this.phoneAddress = jsonData.structure.location.phone;
    this.socialGithub = jsonData.structure.footer.github;
    this.socialLinkedin = jsonData.structure.footer.linkedin;
    this.socialClassImage = jsonData.structure.footer.classSocial;
    this.logoFooterImage = jsonData.structure.footer.logo;
    this.logoClassImage = jsonData.structure.footer.classLogo;
  }
}
