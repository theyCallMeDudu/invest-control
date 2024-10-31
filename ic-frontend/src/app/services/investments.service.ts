import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from '../shared/models/investment.model';
import { Operation } from '../shared/models/operation.model';
import { environment } from 'src/environments/environment';
import { AveragePrice } from '../shared/models/average-price.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

  private readonly apiUrl = `${environment.baseApiUrl}/investments`;

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
    // Sends the request with the authentication header
    return this.http.get<Investment[]>(`${this.apiUrl}`, this.httpOptions);
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

  getAvailableInvestmentYears(investmentId: number): Observable<{ availableYears: number[] }> {
    return this.http.get<{ availableYears: number[] }>(`${this.apiUrl}/${investmentId}/available-years`, this.httpOptions);
  }

  getYearOperationsSummary(investmentId: number, year: number): Observable<{ summary: AveragePrice[] }> {
    return this.http.get<{ summary: AveragePrice[] }>(`${environment.baseApiUrl}/investments/${investmentId}/operations/summary/${year}`, this.httpOptions);
  }
}
