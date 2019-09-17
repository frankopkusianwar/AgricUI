import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminApiCallsService {
  baseUrl = `${environment.API_URL}`;
  public token;

  constructor(private http: HttpClient) {
    this.token = JSON.parse(localStorage.getItem('currentUser'));
  }
  httpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: this.token.token
      })
    };
  }

  getData(route: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${route}`, this.httpOptions());
  }

  postData(endpoint: string, data: object): Observable<any> {
    return this.http.post<any[]>(`${this.baseUrl}/${endpoint}`, data,  this.httpOptions());
  }
}
