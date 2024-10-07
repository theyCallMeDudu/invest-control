import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from '../shared/models/investment.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  private apiUrl = 'http://localhost:8000/api/investment';

  // HTTP options with authorization header
  private httpOptions = { headers: this.getAuthHeaders() };

  constructor(private http: HttpClient) { }

  // Gets the authorization header
  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  }

  // Method to save investments in database
  save(investmentName: string, investmentType: number): Observable<Investment> {
    const investmentData = {
      investment_name: investmentName,
      investment_type_id: investmentType
    };

    // Send the data on request body.
    return this.http.post<Investment>(this.apiUrl, investmentData, this.httpOptions);
  }

  // Method to get all investments in database
  getInvestments(): Observable<Investment[]> {
    return this.http.get<Investment[]>(this.apiUrl, this.httpOptions);
  }

  // Method to get an investment by its ID
  getInvestmentById(id: number): Observable<Investment> {
    return this.http.get<Investment>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  // Method to update an existing investment
  update(investmentId: number | null, investmentName: string, investmentType: number): Observable<Investment> {
    return this.http.put<Investment>(`${this.apiUrl}/${investmentId}`,
      {
        investment_name: investmentName,
        investment_type_id: investmentType
      }, this.httpOptions);
  }

  // Method to delete an existing investment by its ID
  delete(investmentId: number | null): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${investmentId}`, this.httpOptions);
  }
}
