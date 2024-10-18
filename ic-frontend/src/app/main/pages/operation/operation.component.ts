import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrencyTypeService } from 'src/app/services/currency-type-service';
import { InvestmentsService } from 'src/app/services/investments.service';
import { OperationTypeService } from 'src/app/services/operation-type.service';
import { OperationsService } from 'src/app/services/operations.service';
import { CurrencyType } from 'src/app/shared/models/currency-type.model';
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
  investmentType: string = '';

  quantity: number = 1;

  currencyTypes: CurrencyType[] = [];
  currencyType: number = 0;
  currencyTypeSymbol: string = "R$";

  unitPrice: number = 0;

  operationValue: number = 0;

  submitted:boolean = false;
  isEditMode: boolean = false;
  operationId: number | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private operationTypeService: OperationTypeService,
    private operationsService: OperationsService,
    private investmentsService: InvestmentsService,
    private currencyTypeService: CurrencyTypeService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getOperationTypes();
    this.getInvestments();
    this.getCurrencyTypes();
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

  getOperationTypes(): void {
    this.operationTypeService.getOperationTypes().subscribe({
      next: (data) => {
        this.operationTypes = data;
        console.log(this.operationTypes);
      },
      error: (err) => {
        console.error('An error occurred while fetching operation types', err);
      }
    });
  }

  getInvestments(): void {
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

  getCurrencyTypes(): void {
    this.currencyTypeService.getCurrencyTypes().subscribe({
      next: (data) => {
        this.currencyTypes = data;
        console.log(this.currencyTypes);
      },
      error: (err) => {
        console.error('An error occurred while fetching currency types', err);
      }
    });
  }

  onInvestmentChange(investmentId: number): void {
    if (this.investments && this.investments.length > 0) {
      const selectedInvestment = this.investments.find(investment => investment.investment_id === Number(investmentId));

      if (selectedInvestment && selectedInvestment.investment_type) {
        this.investmentType = selectedInvestment.investment_type.investment_type_name;
      } else {
        this.investmentType = '';
      }
    } else {
      console.error("Investments array is not loaded yet or is empty.");
    }
  }

  onCurrencyTypeChange(selectedCurrencyType: any): void {
    const selectedCurrency = this.currencyTypes.find(
      currency => currency.currency_type_id === Number(this.currencyType)
    );

    if (selectedCurrency) {
      switch (selectedCurrency.currency_type_code) {
        case 'USD':
          this.currencyTypeSymbol = '$';
          break;
        case 'EUR':
          this.currencyTypeSymbol = '€';
          break;
        case 'BRL':
          this.currencyTypeSymbol = 'R$';
          break;
        default:
          this.currencyTypeSymbol = '';
      }
    }
  }

  updateOperationValue(): void {
    // Removes the mask and converts into number
    const numericUnitPrice = this.unitPrice;

    // Multiplies quantity and unitPrice to calculate the transaction value
    this.operationValue = this.quantity * (isNaN(numericUnitPrice) ? 0 : numericUnitPrice);
  }

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
