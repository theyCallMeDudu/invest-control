import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Laravel backend URL
  private apiUrl = 'http://localhost:8000/api/login'

  constructor(private http: HttpClient) { }

  // Send a POST request to the backend with user's email and password
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }
}
