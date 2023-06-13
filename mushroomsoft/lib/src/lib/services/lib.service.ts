import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_STRAPI} from '../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class MainLibService {
  private apiStrapi: string;

  constructor(private http: HttpClient) {
    this.apiStrapi = API_STRAPI;
  }

  /**
   * @description get article of the file Json
   * @return articleItems
   */

  getForm(type: string) {
    const url = this.apiStrapi;
    return this.http.get(url + type);
  }
}
