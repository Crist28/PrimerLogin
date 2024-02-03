import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './../environment/global.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public url;

  constructor(private http: HttpClient) {
    this.url = Global.url;
  }

  register_user(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.url}register_user`, data, { headers });
  }

  login_user(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + 'login_user', data, { headers });
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }
}
