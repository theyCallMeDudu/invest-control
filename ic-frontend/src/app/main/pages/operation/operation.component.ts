import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  operationType: number = 0;
  operationDate: string = '';
  operationValue: number = 0;
  operationId: number | null = null;

  investments: Investment[] = [];
  investment: number = 0;
  investmentType: string = '';

  quantity: number = 1;

  currencyTypes: CurrencyType[] = [];
  currencyType: number = 0;
  currencyTypeSymbol: string = "R$";

  unitPrice: number = 0;

  submitted:boolean = false;
  isEditMode: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private operationTypeService: OperationTypeService,
    private operationsService: OperationsService,
    private investmentsService: InvestmentsService,
    private currencyTypeService: CurrencyTypeService,
    private toastr: ToastrService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getOperationTypes();
    this.getInvestments();
    this.getCurrencyTypes();
    this.operationDate = this.formatDate(new Date());
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

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onOperationDateChange(selectedOperationDate: string): void {
    console.log(selectedOperationDate);
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

    if (this.operationForm.invalid
        || this.operationType === 0
        || this.investment === 0
        || this.operationDate === ''
        || this.currencyType === 0
        || this.quantity <= 0
        || this.unitPrice <= 0) {
      // If the form is invalid, the data won't be sent to back-end
      console.log('Invalid form, please fill out all required fields');
      return;
    }

    if (this.isEditMode) {
      // Call the service to save the data
      // this.investmentService.update(
      //   this.investmentId,
      //   this.investmentName,
      //   this.investmentType
      // ).subscribe({
      //   next: (response) => {
      //     this.toastr.success('Investment successfully updated!', 'Success');
      //     console.log('Investment successfully updated!', response);
      //     this.router.navigate(['/investments']); // Redirects to investments page
      //   },
      //   error: (error) => {
      //     this.toastr.error('An error occurred while updating the investment.', 'Error');
      //     console.log('An error occurred when trying to update investment!', error);
      //   }
      // })
    } else {
      // Call the service to save the data
      this.operationsService.save(
        Number(this.operationType),
        Number(this.investment),
        this.operationDate,
        Number(this.currencyType),
        this.quantity,
        this.unitPrice
      ).subscribe({
        next: (response) => {
          this.toastr.success('Operation successfully saved!', 'Success');
          console.log('Operation successfully saved!', response);
          this.router.navigate(['/operations']);
        },
        error: (error) => {
          this.toastr.error('An error occurred while saving the operation.', 'Error');
          console.log('An error occurred when trying to save operation!', error);
        }
      });
    }
  }

}
