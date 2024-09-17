import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvestmentTypeService } from 'src/app/services/investment-type.service';
import { InvestmentType } from 'src/app/shared/models/investment-type.model';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  investmentTypes: InvestmentType[] = [];

  constructor(
    private router: Router,
    private investmentTypeService: InvestmentTypeService
  ) { }

  ngOnInit(): void {

    // Calls investment type service to get
    // available investment types in database
    this.investmentTypeService.getInvestmentTypes().subscribe({
      next: (types) => this.investmentTypes = types,
      error: (err) => console.error('An error occurred when trying to get investment types.', err)
    });
    console.log(this.investmentTypes);
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
