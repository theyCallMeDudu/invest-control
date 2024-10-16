import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyType } from '../shared/models/currency-type.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyTypeService {

  private apiUrl = 'http://localhost:8000/api/currency-types';

  constructor(private http: HttpClient) { }

  // Method to get currency types in database
  getCurrencyTypes(): Observable<CurrencyType[]> {
    return this.http.get<CurrencyType[]>(this.apiUrl);
  }
}
