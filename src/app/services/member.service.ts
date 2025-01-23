import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Member } from '../types/member.interface';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private authorization: string = environment.API_AUTHORIZATION || '';
  private memberApiUrl: string = environment.memberApiUrl;
  private mediaApiUrl = environment.mediaApiUrl;

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this.http.get<{ acf?: Member }[]>(this.memberApiUrl).pipe(
      map((posts) =>
        posts.filter((post) => post.acf).map((post) => post.acf as Member)
      ),
      catchError((error) => {
        console.error('Error fetching posts', error);
        return of([]);
      })
    );
  }

  getImage(foto: number): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: this.authorization,
    });

    return this.http
      .get<any>(this.mediaApiUrl + foto, { headers })
      .pipe(map((response) => response.source_url));
  }
}
