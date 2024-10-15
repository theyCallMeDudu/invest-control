import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvestmentsService } from 'src/app/services/investments.service';
import { OperationTypeService } from 'src/app/services/operation-type.service';
import { OperationsService } from 'src/app/services/operations.service';
import { CurrencyType } from 'src/app/shared/models/currency-type.model';
import { InvestmentType } from 'src/app/shared/models/investment-type.model';
import { Investment } from 'src/app/shared/models/investment.model';
import { OperationType } from 'src/app/shared/models/operation-type.model';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  // Catches the form with ViewChild
  @ViewChild('operationForm') operationForm!: NgForm;

  operationTypes: OperationType[] = [];
  operationName: string = '';
  operationType: number = 0;

  investments: Investment[] = [];
  investment: number = 0;

  currencyTypes: CurrencyType[] = [];
  currencyType: number = 0;

  submitted:boolean = false;
  isEditMode: boolean = false;
  operationId: number | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private operationTypeService: OperationTypeService,
    private operationsService: OperationsService,
    private investmentsService: InvestmentsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.investmentsService.getInvestments().subscribe({
      next: (data) => {
        this.investments = data;
        console.log(this.investments);
      },
      error: (err) => {
        console.error('An error occurred while fetching investments', err);
      }
    });
  }

  cancelButton = {
    text: 'Cancel',
    styleClass: 'btn-secondary',
    action: () => this.router.navigate(['/operations'])  // Redirects to operations page
  };

  saveButton = {
    text: 'Save',
    styleClass: 'btn-standard',
    type: 'submit',
    action: () => this.onSubmit()
  };

  onSubmit(): void {
    this.submitted = true;

    // if (this.investmentForm.invalid || this.investmentType === 0) {
    //   // If the form is invalid, the data won't be sent to back-end
    //   console.log('Invalid form, please fill out all required fields');
    //   return;
    // }

    // if (this.isEditMode) {
    //   // Call the service to save the data
    //   this.investmentService.update(
    //     this.investmentId,
    //     this.investmentName,
    //     this.investmentType
    //   ).subscribe({
    //     next: (response) => {
    //       this.toastr.success('Investment successfully updated!', 'Success');
    //       console.log('Investment successfully updated!', response);
    //       this.router.navigate(['/investments']); // Redirects to investments page
    //     },
    //     error: (error) => {
    //       this.toastr.error('An error occurred while updating the investment.', 'Error');
    //       console.log('An error occurred when trying to update investment!', error);
    //     }
    //   })
    // } else {
    //   // Call the service to save the data
    //   this.investmentService.save(
    //     this.investmentName,
    //     this.investmentType
    //   ).subscribe({
    //     next: (response) => {
    //       this.toastr.success('Investment successfully saved!', 'Success');
    //       console.log('Investment successfully saved!', response);
    //       this.router.navigate(['/investments']); // Redirects to investments page
    //     },
    //     error: (error) => {
    //       this.toastr.error('An error occurred while saving the investment.', 'Error');
    //       console.log('An error occurred when trying to save investment!', error);
    //     }
    //   });
    // }
  }

}
