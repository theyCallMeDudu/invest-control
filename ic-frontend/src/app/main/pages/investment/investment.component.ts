import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { InvestmentTypeService } from 'src/app/services/investment-type.service';
import { InvestmentService } from 'src/app/services/investment.service';
import { InvestmentType } from 'src/app/shared/models/investment-type.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  // Catches the form with ViewChild
  @ViewChild('investmentForm') investmentForm!: NgForm;

  investmentTypes: InvestmentType[] = [];
  investmentName: string = '';
  investmentType: number = 0;
  submitted:boolean = false;

  constructor(
    private router: Router,
    private investmentTypeService: InvestmentTypeService,
    private investmentService: InvestmentService
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
    type: 'submit',
    action: () => this.onSubmit()
  };

  onSubmit(): void {
    // debugger;
    this.submitted = true;

    if (this.investmentForm.invalid || this.investmentType === 0) {
      // If the form is invalid, the data won't be sent to back-end
      console.log('Invalid form, please fill out all required fields');
      return;
    }

    // Call the service to save the data
    this.investmentService.save(
      this.investmentName,
      this.investmentType
    ).subscribe({
      next: (response) => {
        console.log('Investment successfully saved!', response);
        this.router.navigate(['/investments']); // Redirects to investments page
      },
      error: (error) => {
        console.log('An error occurred when trying to save investment!', error);
      }
    })
  }

}
