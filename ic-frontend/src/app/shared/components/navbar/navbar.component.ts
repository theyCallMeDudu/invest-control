import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: User | null = null;
  userName: string = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.onLogin();
  }

  onLogin() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
    // this.userName = this.user.name;
    console.log('logado: ', this.user);
  }

  onLogout() {
    this.authService.logout();
  }
}
