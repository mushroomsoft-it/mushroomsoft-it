import {NgModule} from '@angular/core';
import {MainLibService} from './services/lib.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: [MainLibService, HttpClientModule]
})
export class MainLibModule {}
