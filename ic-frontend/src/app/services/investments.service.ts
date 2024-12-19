import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from '../shared/models/investment.model';
import { environment } from 'src/environments/environment';
import { PaginatedResponse } from '../shared/models/paginated-response.model';
import { AveragePrice } from '../shared/models/average-price.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

  private readonly apiUrl = `${environment.baseApiUrl}/investments`;

  // HTTP options with authorization header
  private httpOptions = { headers: this.getAuthHeaders() };

  // Gets the authorization header
  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  }

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
  // getPaginatedInvestments(currentPage: number = 1, perPage: number = 10): Observable<PaginatedResponse<Investment>> {
  //   // Sets the pagination params and number of items per page
  //   const params = { page: currentPage.toString(), perPage: perPage.toString() };

  //   // Sends the request with the authentication header and pagination params
  //   return this.http.get<PaginatedResponse<Investment>>(this.apiUrl, {
  //     headers: this.httpOptions.headers,
  //     params: params
  //   });
  // }

  getPaginatedInvestments(page: number = 1, itemsPerPage = 10): Observable<PaginatedResponse<Investment>> {
    return this.http.get<PaginatedResponse<Investment>>(`${this.apiUrl}?page=${page}&per_page=${itemsPerPage}`, {
      headers: this.httpOptions.headers
    });
  }

   // Method to get investments in database to fill select fields
   getAllInvestments(): Observable<Investment[]> {
    // Sends the request with the authentication header
    return this.http.get<Investment[]>(`${this.apiUrl}-all`);
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
