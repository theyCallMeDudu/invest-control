import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../shared/models/operation.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  private readonly apiUrl = 'http://localhost:8000/api/operations';

  constructor(private http: HttpClient) { }

  getInvestments(): Observable<Operation[]> {
    // Gets the auth token from local storage
    const token = localStorage.getItem('authToken');

    // Creates the authentication header with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Sends the request with the authentication header
    return this.http.get<Operation[]>(this.apiUrl, { headers });
  }
}
