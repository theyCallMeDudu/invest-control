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
  isLoading: boolean = false;
  isTypeLoading: boolean = false;
  isInvestmentLoading: boolean = false;
  isCurrencyLoading: boolean = false;
  isSubmitLoading: boolean = false;

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

    this.isLoading = true;
    this.isTypeLoading = true;
    this.isInvestmentLoading = true;
    this.isInvestmentLoading = true;
    this.isCurrencyLoading = true;

    // Gets the operatoin_id parameter from the route
    this.operationId = Number(this.activatedRoute.snapshot.paramMap.get('operation_id'));

    // Defines if we are on edit mode.
    // If we have the operation id, so it's edit mode!
    this.isEditMode = !!this.operationId;

    // If we are on edit mode, gets the operation data
    if (this.isEditMode) {
      this.operationsService.getOperationById(this.operationId).subscribe({
        next: (operation) => {
          this.operationType  = operation.operation_type?.operation_type_id ?? null;
          this.investment     = operation.investment?.investment_id ?? null;
          this.investmentType = operation.investment.investment_type.investment_type_name ?? '';
          this.currencyType   = operation.currency_type.currency_type_id ?? null;
          this.operationDate  = operation.operation_date?.toString() ?? '';
          this.quantity       = operation.quantity ?? 0;
          this.unitPrice      = operation.unit_price ?? 0;
          this.operationValue = operation.operation_value ?? 0;

          this.isLoading = false;
          this.isTypeLoading = false;
          this.isInvestmentLoading = false;
          this.isCurrencyLoading = false;
        },
        error: (err) => {
          console.error('An error occurred while fetching operation for editing.', err);
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
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
        this.isTypeLoading = false;
      },
      error: (err) => {
        console.error('An error occurred while fetching operation types', err);
        this.isTypeLoading = false;
      }
    });
  }

  getInvestments(): void {
    this.investmentsService.getPaginatedInvestments(1, 10).subscribe({
      next: (data) => {
        // Extracting the array of investments from key "data"
        this.investments = data.data || []; // Using `data.data` to access the array inside the paginated object
        this.isInvestmentLoading = false;
        console.log(this.investments);
      },
      error: (err) => {
        console.error('An error occurred while fetching investments', err);
        this.isInvestmentLoading = false;
      }
    });
  }

  getCurrencyTypes(): void {
    this.currencyTypeService.getCurrencyTypes().subscribe({
      next: (data) => {
        this.currencyTypes = data;
        this.isCurrencyLoading = false;
      },
      error: (err) => {
        console.error('An error occurred while fetching currency types', err);
        this.isCurrencyLoading = false;
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

  onOperationDateChange(selectedOperationDate: string): void {}

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
    this.isSubmitLoading = true;

    if (this.operationForm.invalid
        || this.operationType === 0
        || this.investment === 0
        || this.operationDate === ''
        || this.currencyType === 0
        || this.quantity <= 0
        || this.unitPrice <= 0) {
      // If the form is invalid, the data won't be sent to back-end
      console.log('Invalid form, please fill out all required fields');
      this.isSubmitLoading = false;
      return;
    }

    if (this.isEditMode) {
      // Call the service to save the data
      this.operationsService.update(
        this.operationId,
        this.operationType,
        this.operationDate,
        this.investment,
        this.currencyType,
        this.quantity,
        this.unitPrice
      ).subscribe({
        next: (response) => {
          this.isSubmitLoading = false;
          this.toastr.success('Operation successfully updated!', 'Success');
          console.log('Operation successfully updated!', response);
          this.router.navigate(['/operations']);
        },
        error: (error) => {
          this.isSubmitLoading = false;
          const errorMessage = error.error?.message || 'An error occurred while updating the operation.';
          this.toastr.error(errorMessage, 'Error');
          console.error('An error occurred when trying to update operation!', error);
        }
      })
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
          this.isSubmitLoading = false;
          this.toastr.success('Operation successfully saved!', 'Success');
          console.log('Operation successfully saved!', response);
          this.router.navigate(['/operations']);
        },
        error: (error) => {
          this.isSubmitLoading = false;
          const errorMessage = error.error?.message || 'An error occurred while saving the operation.';
          this.toastr.error(errorMessage, 'Error');
          console.error('An error occurred when trying to save operation!', error);
        }
      });
    }
  }

}
