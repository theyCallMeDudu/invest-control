import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private apiUrl = `${environment.baseApiUrl}/wallet`;

  // HTTP options with authorization header
  private httpOptions = { headers: this.getAuthHeaders() };

  // Gets the authorization header
  private getAuthHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
  }

  constructor(private http: HttpClient) { }

  getTotalInvested(): Observable<{ total_invested: number }> {
    return this.http.get<{ total_invested: number }>(`${this.apiUrl}/total-invested`, {
      headers: this.httpOptions.headers,
    });
  }
}
