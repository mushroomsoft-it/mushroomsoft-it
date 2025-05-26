import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {
    console.log(process.env['POWER_AUTOMATE_URL']);
  }

  getAccessKey(): string {
    return environment.PUBLIC_ACCESS_KEY;
  }

  sendEmail(formData: any): Observable<any> {
    return this.http.post(environment.EMAIL_API, formData);
  }
}
