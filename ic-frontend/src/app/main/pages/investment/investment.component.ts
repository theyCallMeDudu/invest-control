import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentTypeService } from 'src/app/services/investment-type.service';
import { InvestmentService } from 'src/app/services/investment.service';
import { InvestmentType } from 'src/app/shared/models/investment-type.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  investmentId: number | null = null;

  submitted:boolean = false;
  isEditMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private investmentTypeService: InvestmentTypeService,
    private investmentService: InvestmentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    // Gets the investment_id parameter from the route
    this.investmentId = Number(this.activatedRoute.snapshot.paramMap.get('investment_id'));

    // Defines if we are on edit mode
    this.isEditMode = !!this.investmentId;

    // If we are on edit mode, gets the investment data
    if (this.isEditMode) {
      this.investmentService.getInvestmentById(this.investmentId).subscribe({
        next: (investment) => {
          this.investmentName = investment.investment_name;
          this.investmentType = investment.investment_type_id;

          this.isLoading = false;
        },
        error: (err) => {
          console.error('An error occurred while fetching investment for editing.', err);
          this.isLoading = false;
        }
      })
    } else {
      this.isLoading = false;
    }

    // Calls investment type service to get
    // available investment types in database
    this.investmentTypeService.getInvestmentTypes().subscribe({
      next: (types) => this.investmentTypes = types,
      error: (err) => console.error('An error occurred when trying to get investment types.', err)
    });
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
    this.submitted = true;

    if (this.investmentForm.invalid || this.investmentType === 0) {
      // If the form is invalid, the data won't be sent to back-end
      console.log('Invalid form, please fill out all required fields');
      return;
    }

    if (this.isEditMode) {
      // Call the service to save the data
      this.investmentService.update(
        this.investmentId,
        this.investmentName,
        this.investmentType
      ).subscribe({
        next: (response) => {
          this.toastr.success('Investment successfully updated!', 'Success');
          console.log('Investment successfully updated!', response);
          this.router.navigate(['/investments']); // Redirects to investments page
        },
        error: (error) => {
          this.toastr.error('An error occurred while updating the investment.', 'Error');
          console.log('An error occurred when trying to update investment!', error);
        }
      })
    } else {
      // Call the service to save the data
      this.investmentService.save(
        this.investmentName,
        this.investmentType
      ).subscribe({
        next: (response) => {
          this.toastr.success('Investment successfully saved!', 'Success');
          console.log('Investment successfully saved!', response);
          this.router.navigate(['/investments']); // Redirects to investments page
        },
        error: (error) => {
          this.toastr.error('An error occurred while saving the investment.', 'Error');
          console.log('An error occurred when trying to save investment!', error);
        }
      });
    }
  }

}
