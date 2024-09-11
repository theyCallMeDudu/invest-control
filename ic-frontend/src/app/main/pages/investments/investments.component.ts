import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent {

  constructor(private router: Router) {}

  buttonConfig = {
    icon: 'fas fa-plus',
    styleClass: 'btn-standard',
    tooltip: 'New investment',
    action: () => this.router.navigate(['/investment'])  // Redirects to investment page
  };

}
