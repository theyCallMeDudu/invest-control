import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvestmentsService } from 'src/app/services/investments.service';
import { Investment } from 'src/app/shared/models/investment.model';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {

  investments: Investment[] = [];

  constructor(
    private router: Router,
    private investmentsService: InvestmentsService
  ) {}

  ngOnInit(): void {
    // Calls the service to get the investments
    this.investmentsService.getInvestments().subscribe({
      next: (data) => {
        this.investments = data;
        console.log(this.investments);
      },
      error: (err) => console.error('An error occurred while fetching investments', err)
    });
  }

  newInvestmentButton = {
    icon: 'fas fa-plus',
    styleClass: 'btn-standard',
    tooltip: 'New investment',
    action: () => this.router.navigate(['/investment'])  // Redirects to new investment page
  };

  /**
   * Creates a dynamic configuration for the edit button
   * takes an investment as a parameter and returns a configuration object
   * for the edit button.
   * Using this function allows you to create the complete button configuration
   * for each investment before passing it to the component in the HTML.
  */
  getEditButtonConfig(investment: Investment) {
    return {
      icon: 'fas fa-pencil',
      styleClass: 'btn-standard',
      tooltip: 'Edit investment',
      action: () => this.router.navigate([`/investment/${investment.investment_id}`])
    };
  }

}
