import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { InvestmentsService } from 'src/app/services/investments.service';
import { OperationsService } from 'src/app/services/operations.service';
import { Investment } from 'src/app/shared/models/investment.model';
import { Operation } from 'src/app/shared/models/operation.model';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {

  investments: Investment[] = [];
  filteredInvestments: Investment[] = [];
  searchTerm: string = '';
  loading: boolean = true;

  constructor(
    private router: Router,
    private investmentsService: InvestmentsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Calls the service to get the investments
    this.investmentsService.getInvestments().subscribe({
      next: (data) => {
        this.investments = data;
        this.filteredInvestments = [...data]; // starts the filtered list as the original list of investments
        this.loading = false; // finishes the loading state
      },
      error: (err) => {
        console.error('An error occurred while fetching investments', err);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredInvestments = this.investments.filter(investment =>
        investment.investment_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredInvestments = this.investments;
    }
  }

  newInvestmentButton = {
    icon: 'fas fa-plus',
    styleClass: 'btn-standard',
    tooltip: 'New investment',
    action: () => this.router.navigate(['/investments/new'])  // Redirects to new investment page
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
      action: () => this.router.navigate([`/investments/${investment.investment_id}`])
    };
  }

  getDeleteButtonConfig(investment: Investment) {
    return {
      icon: 'fas fa-trash',
      styleClass: 'btn-standard',
      tooltip: 'Delete investment',
      action: () => this.deleteInvestment(investment.investment_id)
    }
  }

  getAveragePriceButtonConfig(investment: Investment) {
    return {
      icon: 'fas fa-chart-line',
      styleClass: 'btn-standard',
      tooltip: 'View investment average price',
      action: () => this.router.navigate([`/investments/${investment.investment_id}/average-price`])
    };
  }

  deleteInvestment(investmentId: number): void {
    // Confirms the deletion with the user
    if (confirm("Are you sure you want to delete this investment?")) {
      this.investmentsService.delete(investmentId).subscribe({
        next: () => {
          this.toastr.success('Investment successfully deleted!', 'Success');

          // Updates the investments list after deletion
          this.investments = this.investments.filter(inv => inv.investment_id !== investmentId);
          this.filteredInvestments = this.filteredInvestments.filter(inv => inv.investment_id !== investmentId);

          // Updates the filtered list
          this.onSearch();
        },
        error: (err) => {
          this.toastr.error(err.error.message, 'Error');
          console.error('An error occurred while deleting the investment.', err);
        }
      });
    }
  }
}
