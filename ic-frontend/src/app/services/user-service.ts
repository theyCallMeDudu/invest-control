import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = `${environment.baseApiUrl}/investments`;

  // HTTP options with authorization header
  private httpOptions = { headers: this.getAuthHeaders() };

  // Gets the authorization header
  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  }

  constructor(private http: HttpClient) { }

  getUserData(userId: number): Observable<User> {
   return this.http.get<User>(`${this.apiUrl}/${userId}`, this.httpOptions);
  }
}
