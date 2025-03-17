import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Investment } from "../shared/models/investment.model";
import { WalletInvestment } from "../shared/models/wallet-investment";

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

  getTotalInvestedByType(investmentType: number): Observable<{ total_invested: number }> {
    return this.http.get<{ total_invested: number }>(`${this.apiUrl}/total-invested-per-type/${investmentType}`, {
      headers: this.httpOptions.headers,
    });
  }

  getWalletInvestments(walletId: number): Observable<WalletInvestment[]> {
    return this.http.get<WalletInvestment[]>(`${this.apiUrl}/${walletId}/investments`, {
      headers: this.httpOptions.headers
    });
  }
}
