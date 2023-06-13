import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {AppRoutingModule} from './app-routing.module';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {HomeComponent} from './components/home/home.component';
import {ContactComponent} from './components/contact/contact.component';
import {BannerComponent} from './components/banner/banner.component';
import {SectionComponent} from './components/section/section.component';
import {ServiceComponent} from './components/service/service.component';
import {ArticleComponent} from './components/article/article.component';
import {TechnologyComponent} from './components/technology/technology.component';
import {FooterComponent} from './components/footer/footer.component';
import {MainLibModule} from '@mushroomsoft-lib';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ContactComponent,
    BannerComponent,
    SectionComponent,
    ServiceComponent,
    ArticleComponent,
    TechnologyComponent,
    FooterComponent
  ],

  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
    MainLibModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
