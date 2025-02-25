import { Component, OnInit } from '@angular/core';
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
  submitted: boolean = false;
  emailError: string | null = null;
  passwordError: string | null = null;
  generalError: string | null = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  loginButton = {
    text: 'Login',
    styleClass: 'btn-standard',
    type: 'submit',
    width: '100%',
    action: () => this.onSubmit()
  };

  onSubmit(): void {
    this.submitted = true;
    this.emailError = this.passwordError = this.generalError = null;
    this.isLoading = true;

    if (!this.email) {
      this.emailError = 'E-mail is mandatory';
      this.isLoading = false;
      return;
    }

    if (!this.password) {
      this.passwordError = 'Password is mandatory';
      this.isLoading = false;
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful!', response);
        this.isLoading = false;
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('walletId', response.wallet_id);
        this.router.navigate(['/wallet', response.wallet_id]); // Redirects to wallet page
      },
      error: (error) => {
        console.log('Login failed!', error);
        this.isLoading = false;
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
