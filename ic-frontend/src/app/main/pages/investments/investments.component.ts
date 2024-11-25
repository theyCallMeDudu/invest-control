import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvestmentsService } from 'src/app/services/investments.service';
import { Investment } from 'src/app/shared/models/investment.model';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {

  investments: Investment[] = [];
  filteredInvestments: Investment[] = [];
  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 5;
  loading: boolean = true;
  searchTerm: string = '';

  constructor(
    private router: Router,
    private investmentsService: InvestmentsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadInvestments(this.currentPage);
  }

  // Load paginates investments
  loadInvestments(currentPage: number = 1): void {
    this.loading = true;

    // Fetch investments for the current page with the defined number of items per page
    this.investmentsService.getPaginatedInvestments(currentPage, this.itemsPerPage).subscribe({
      next: response => {
        this.investments = response.data;
        this.filteredInvestments = [...this.investments]; // Set filtered operations to match loaded data
        this.totalItems = response.total;
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Failed to load investments.');
        this.loading = false;
      }
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    console.log(`Page changed to: ${page}`);
    console.log(`Current page: ${this.currentPage}, Items per page: ${this.itemsPerPage}`);
    this.loadInvestments(page);
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
