import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationsService } from 'src/app/services/operations.service';
import { Operation } from 'src/app/shared/models/operation.model';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  operations: Operation[] = [];
  filteredOperations: Operation[] = [];
  searchTerm: string = '';
  loading: boolean = true;

  constructor(
    private router: Router,
    private operationsService: OperationsService,
    private toastr: ToastrService
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
  }

  // onSearch(): void {
  //   if (this.searchTerm) {
  //     this.filteredOperations = this.operations.filter(operation =>
  //       // TO DO: Build search logic "what terms to use?"
  //     );
  //   } else {
  //     this.filteredOperations = this.operations;
  //   }
  // }

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
