import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from '../shared/models/investment.model';
import { environment } from 'src/environments/environment';
import { AveragePrice } from '../shared/models/average-price.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

  private readonly apiUrl = `${environment.baseApiUrl}/investments`;

  constructor(private http: HttpClient) { }

  // Method to save investments in database
  save(investmentName: string, investmentType: number): Observable<Investment> {
    const investmentData = {
      investment_name: investmentName,
      investment_type_id: investmentType
    };

    // Send the data on request body
    return this.http.post<Investment>(this.apiUrl, investmentData);
  }

  // Method to get all investments in database
  getInvestments(): Observable<Investment[]> {
    // Sends the request with the authentication header
    return this.http.get<Investment[]>(`${this.apiUrl}`);
  }

  // Method to get an investment by its ID
  getInvestmentById(id: number): Observable<Investment> {
    return this.http.get<Investment>(`${this.apiUrl}/${id}`);
  }

  // Method to update an existing investment
  update(investmentId: number | null, investmentName: string, investmentType: number): Observable<Investment> {
    return this.http.put<Investment>(`${this.apiUrl}/${investmentId}`,
      {
        investment_name: investmentName,
        investment_type_id: investmentType
      });
  }

  // Method to delete an existing investment by its ID
  delete(investmentId: number | null): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${investmentId}`);
  }

  // Method to retrieve available years for a specific investment
  getAvailableInvestmentYears(investmentId: number): Observable<{ availableYears: number[] }> {
    return this.http.get<{ availableYears: number[] }>(`${this.apiUrl}/${investmentId}/available-years`);
  }

  // Method to retrieve the operations summary for a specific investment and year
  getYearOperationsSummary(investmentId: number, year: number): Observable<{ summary: AveragePrice[] }> {
    return this.http.get<{ summary: AveragePrice[] }>(`${this.apiUrl}/${investmentId}/operations/summary/${year}`);
  }
}
