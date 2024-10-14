import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperationType } from '../shared/models/operation-type.model';

@Injectable({
  providedIn: 'root'
})
export class OperationTypeService {

  private apiUrl = 'http://localhost:8000/api/operation-types';

  constructor(private http: HttpClient) { }

  // Method to get operation types in database
  getOperationTypes(): Observable<OperationType[]> {
    return this.http.get<OperationType[]>(this.apiUrl);
  }
}
