import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cancelButton = {
    text: 'Cancel',
    styleClass: 'btn-secondary',
    action: () => this.router.navigate(['/investments'])  // Redirects to investments page
  };

  saveButton = {
    text: 'Save',
    styleClass: 'btn-standard',
    // TO DO: call save method
    action: () => this.router.navigate(['/investments'])  // Redirects to investments page
  };

}
