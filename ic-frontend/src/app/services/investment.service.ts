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
}
