import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Investment } from '../shared/models/investment.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentsService {

  private apiUrl = 'http://localhost:8000/api/investments';

  constructor(private http: HttpClient) { }

  // Method to get all investments in database
  // getInvestments(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }

  getInvestments(): Observable<Investment[]> {
    // Obtém o token armazenado localmente
    const token = localStorage.getItem('authToken');

    // Cria o cabeçalho de autorização com o token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Envia a requisição com o cabeçalho de autorização
    return this.http.get<Investment[]>(this.apiUrl, { headers });
  }
}
