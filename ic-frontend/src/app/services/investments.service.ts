import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from '../shared/models/investment.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

  private apiUrl = 'http://localhost:8000/api/investments';

  constructor(private http: HttpClient) { }

  // Method to get all investments in database
  // getInvestments(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  getInvestments(): Observable<Investment[]> {
    // Gets the auth token from local storage
    const token = localStorage.getItem('authToken');

    // Creates the authentication header with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Sends the request with the authentication header
    return this.http.get<Investment[]>(this.apiUrl, { headers });
  }
}
