import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

  private apiUrl = 'http://localhost:8000/api/investments';

  constructor(private http: HttpClient) { }

  // Method to get all investments in database
  getInvestments(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
