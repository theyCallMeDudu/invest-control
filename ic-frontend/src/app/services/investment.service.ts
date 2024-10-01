import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from '../shared/models/investment.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  private apiUrl = 'http://localhost:8000/api/investment';

  constructor(private http: HttpClient) { }

  // Method to save investments in database
  save(investmentName: string, investmentType: number): Observable<Investment> {
    const investmentData = {
      investment_name: investmentName,
      investment_type_id: investmentType
    };

    // Send the data on request body.
    return this.http.post<Investment>(this.apiUrl, investmentData);
  }

  // Method to get all investments in database
  getInvestments() {
    return this.http.get(this.apiUrl);
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
}
