import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  submitted:boolean = false;
  emailError: string | null = null;
  passwordError: string | null = null;
  generalError: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  onSubmit(): void {
    this.submitted = true;
    this.emailError = this.passwordError = this.generalError = null;

    if (!this.email) {
      this.emailError = 'E-mail is mandatory';
      return;
    }

    if (!this.password) {
      this.passwordError = 'Password is mandatory';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/investments']); // Redirects to investments page
      },
      error: (error) => {
        console.log('Login failed!', error);
        this.generalError = this.mapErrorToMessage(error);
      }
    })
  }

  private mapErrorToMessage(error: any): string {
    switch (error.error?.error) {
      case 'E-mail not found':
        return 'E-mail not found';
      case 'Incorrect password':
        return 'Incorrect password';
      default:
        return 'Unexpected error. Please, try again.';
    }
  }

}
