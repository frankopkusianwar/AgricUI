import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  post(endpoint: string, data: object): Observable<any> {
    return this.http.post(`${environment.API_URL}/${endpoint}`, { ...data });
  }
  get(endpoint: string, params: any): Observable<any> {
    return this.http.get(`${environment.API_URL}/${endpoint}`);
  }
  patch(endpoint: string, id: string, data: object): Observable<any> {
    return this.http.patch(`${environment.API_URL}/${endpoint}/${id}`, {
      ...data
    });
  }
  put(endpoint: string, data: object): Observable<any> {
    return this.http.put(`${environment.API_URL}/${endpoint}`, {
      ...data
    });
  }

  delete(id: string, endpoint: string): Observable<any> {
    return this.http.delete(`${environment.API_URL}/${endpoint}/${id}`);
  }

  putWithImage(endpoint: string, data:any): Observable<any>{
    return this.http.post(
      `${environment.API_URL}/${endpoint}`, data);
  }
}
