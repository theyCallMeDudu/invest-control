import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvestmentsService } from 'src/app/services/investments.service';
import { OperationTypeService } from 'src/app/services/operation-type.service';
import { OperationsService } from 'src/app/services/operations.service';
import { Investment } from 'src/app/shared/models/investment.model';
import { OperationType } from 'src/app/shared/models/operation-type.model';
import { Operation } from 'src/app/shared/models/operation.model';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  operations: Operation[] = [];
  filteredOperations: Operation[] = [];
  loading: boolean = true;

  operationTypes: OperationType[] = [];
  operationType: number = 0;

  investments: Investment[] = [];
  investment: number = 0;

  operationDate: string = '';
  operationValue: string = ''; // Needs to be a string for mask input

  constructor(
    private router: Router,
    private operationsService: OperationsService,
    private toastr: ToastrService,
    private operationTypeService: OperationTypeService,
    private investmentsService: InvestmentsService,
  ) {}

  ngOnInit(): void {
    // Calls the service to get the operations
    this.operationsService.getOperations().subscribe({
      next: (data) => {
        this.operations = data;
        this.filteredOperations = [...data]; // starts the filtered list as the original list of operations
        this.loading = false; // finishes the loading state
      },
      error: (err) => {
        console.error('An error occurred while fetching operations', err);
        this.loading = false;
      }
    });

    this.getOperationTypes();
    this.getInvestments();
  }

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

  onSearch(): void {
    this.filteredOperations = this.operations.filter(operation => {
      // Filter by operation type
      const matchesOperationType = this.operationType === 0 || operation.operation_type.operation_type_id === this.operationType;

      // Filter by investment
      const matchesInvestment = this.investment === 0 || operation.investment.investment_id === this.investment;

      // Filter by operation date (ensuring both values are strings)
      const matchesOperationDate = this.operationDate === '' || this.formatDate(new Date(operation.operation_date)) === this.operationDate;

      // Filter by operation value (remove mask formatting and compare as numbers)
      const operationValueWithoutMask = Number(this.operationValue.replace(/\./g, '').replace(',', '.'));
      const matchesOperationValue = this.operationValue === '' || operation.operation_value === operationValueWithoutMask;

      return matchesOperationType && matchesInvestment && matchesOperationDate && matchesOperationValue;
    });
  }

  // Detects changes in the filters and triggers the search function
  onOperationTypeChange(): void {
    this.onSearch();
  }

  onInvestmentChange(): void {
    this.onSearch();
  }

  onOperationDateChange(): void {
    this.onSearch();
  }

  onOperationValueChange(): void {
    this.onSearch();
  }

  // Helper function to format date as string (YYYY-MM-DD)
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  newOperationButton = {
    icon: 'fas fa-plus',
    styleClass: 'btn-standard',
    tooltip: 'New operation',
    action: () => this.router.navigate(['/operation'])  // Redirects to new operation page
  };

  /**
   * Creates a dynamic configuration for the edit button
   * takes an operation as a parameter and returns a configuration object
   * for the edit button.
   * Using this function allows you to create the complete button configuration
   * for each operation before passing it to the component in the HTML.
  */
  getEditButtonConfig(operation: Operation) {
    return {
      icon: 'fas fa-pencil',
      styleClass: 'btn-standard',
      tooltip: 'Edit operation',
      action: () => this.router.navigate([`/operation/${operation.operation_id}`])
    };
  }

  getDeleteButtonConfig(operation: Operation) {
    return {
      icon: 'fas fa-trash',
      styleClass: 'btn-standard',
      tooltip: 'Delete operation',
      action: () => this.deleteOperation(operation.operation_id)
    }
  }

  deleteOperation(operationId: number): void {
    // Confirms the deletion with the user
    if (confirm("Are you sure you want to delete this operation?")) {
      this.operationsService.delete(operationId).subscribe({
        next: () => {
          this.toastr.success('Operation successfully deleted!', 'Success');

          // Updates the operations list after deletion
          this.operations = this.operations.filter(inv => inv.operation_id !== operationId);
          this.filteredOperations = this.filteredOperations.filter(inv => inv.operation_id !== operationId);

          // Updates the filtered list
          // this.onSearch();
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
          console.error('An error occurred while deleting the operation.', err);
        }
      });
    }
  }

}
