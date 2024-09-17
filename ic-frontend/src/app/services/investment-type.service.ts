import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InvestmentType } from '../shared/models/investment-type.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentTypeService {

  private apiUrl = 'http://localhost:8000/api/investment-types';

  constructor(private http: HttpClient) { }

  // Method to get investment types in database
  getInvestmentTypes(): Observable<InvestmentType[]> {
    return this.http.get<InvestmentType[]>(this.apiUrl);
  }
}
