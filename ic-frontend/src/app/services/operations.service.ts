import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../shared/models/operation.model';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  private readonly apiUrl = 'http://localhost:8000/api/operations';

  // HTTP options with authorization header
  private httpOptions = { headers: this.getAuthHeaders() };

  // Gets the authorization header
  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  }

  constructor(private http: HttpClient) { }

  getOperations(): Observable<Operation[]> {
    // Gets the auth token from local storage
    const token = localStorage.getItem('authToken');

    // Creates the authentication header with token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Sends the request with the authentication header
    return this.http.get<Operation[]>(this.apiUrl, { headers });
  }

  // Method to save investments in database
  save(
    operationType: number,
    investment: number,
    operationDate: string,
    currencyType: number,
    quantity: number,
    unitPrice: number
  ): Observable<Operation> {
    const operationData = {
      investment_id: investment,
      operation_type_id: operationType,
      currency_type_id: currencyType,
      operation_date: operationDate,
      quantity: quantity,
      unit_price: unitPrice,
      operation_value: quantity * unitPrice
    };

    // Send the data on request body.
    return this.http.post<Operation>(this.apiUrl, operationData, this.httpOptions);
  }

  // Method to get an operatoin by its ID
  getOperationById(id: number): Observable<Operation> {
    return this.http.get<Operation>(`${this.apiUrl}/${id}`, this.httpOptions);
  }

  // Method to update an existing operation
  update(
    operationId: number | null,
    operationType: number,
    operationDate: string,
    investment: number,
    currencyType: number,
    quantity: number,
    unitPrice: number
  ): Observable<Operation> {
    const operationData = {
      operation_id: operationId,
      investment_id: investment,
      operation_type_id: operationType,
      operation_date: operationDate,
      currency_type_id: currencyType,
      quantity: quantity,
      unit_price: unitPrice
    }
    return this.http.put<Operation>(
      `${this.apiUrl}/${operationId}`,
      operationData,
      this.httpOptions);
  }

  // Method to delete an existing operation by its ID
  delete(operationId: number | null): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${operationId}`, this.httpOptions);
  }
}
