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

    return this.http.post<any>(route, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('authToken', response.token); // Saves authToken on localStorage
      })
    );
  }

  // Send a POST request to the backend deleting user's auth token
  logout() {
    const route = '/logout';
    const authToken = localStorage.getItem('authToken'); // Gets authToken from localStorage

    if (authToken) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);
      return this.http.post(`${this.apiUrl}${route}`, {}, { headers }).subscribe({
        next: () => {
          localStorage.removeItem('authToken'); // Removes authToken from localStorage
          this.router.navigate(['/login']); // Redirects to login page
        },
        error: (error) => {
          console.error('Logout failed!', error);
          return error;
        }
      });
    } else {
      console.error('No token found, redirecting to login.');
      this.router.navigate(['/login']); // Redirects to login page
      return;
    }
  }

}
