import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Laravel backend URL
  private apiUrl = 'http://localhost:8000/api'

  constructor(
    private http: HttpClient,
    private router: Router) {}

  // Send a POST request to the backend with user's email and password
  login(email: string, password: string): Observable<any> {
    const sufix = '/login';
    const route = `${this.apiUrl}${sufix}`;
    // return this.http.post<any>(`${this.apiUrl}${route}`, { email, password });
    return this.http.post<any>(route, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token); // Salva o token no localStorage
      })
    );
  }

  // Send a POST request to the backend deleting user's auth token
  logout() {
    const route = '/logout';
    const authToken = localStorage.getItem('authToken'); // Obtém o token do localStorage

    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
      return this.http.post(`${this.apiUrl}${route}`, {}, { headers }).subscribe({
        next: () => {
          localStorage.removeItem('authToken'); // Remove o token do localStorage
          this.router.navigate(['/login']); // Redireciona para a página de login
        },
        error: (error) => {
          console.error('Logout failed!', error);
          return error;
        }
      });
    } else {
      console.error('No token found, redirecting to login.');
      this.router.navigate(['/login']); // Redireciona para a página de login
      return;
    }
  }

}
