import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {AppRoutingModule} from './app-routing.module';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';

import {HomeComponent} from './components/home/home.component';
import {ContactComponent} from './components/contact/contact.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomeComponent, ContactComponent],

  imports: [CommonModule, BrowserModule, AppRoutingModule, ReactiveFormsModule, FormlyModule.forRoot(), FormlyBootstrapModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
