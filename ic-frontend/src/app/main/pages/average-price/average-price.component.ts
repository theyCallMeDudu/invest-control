import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { InvestmentTypeService } from 'src/app/services/investment-type.service';
import { InvestmentsService } from 'src/app/services/investments.service';
import { WalletService } from 'src/app/services/wallet-service';
import { AveragePrice } from 'src/app/shared/models/average-price.model';
import { InvestmentType } from 'src/app/shared/models/investment-type.model';
import { Investment } from 'src/app/shared/models/investment.model';
import { Operation } from 'src/app/shared/models/operation.model';
import { WalletInvestment } from 'src/app/shared/models/wallet-investment';

@Component({
  selector: 'app-average-price',
  templateUrl: './average-price.component.html',
  styleUrls: ['./average-price.component.css']
})
export class AveragePriceComponent implements OnInit {
  walletId: string = '';
  investmentTypes: InvestmentType[] = [];
  walletInvestments: WalletInvestment[] = [];
  investmentType: number = 0;
  availableYears: number[] = [];
  searchYear: number = new Date().getFullYear();
  investmentId: number | null = null;
  yearOperations: AveragePrice[] = [];
  filteredInvestments: WalletInvestment[] = [];

  isLoading: boolean = false;
  isTypeLoading: boolean = false;
  areInvestmentsLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private investmentsService: InvestmentsService,
    private investmentTypeService: InvestmentTypeService,
    private walletService: WalletService
  ) { }

  ngOnInit(): void {
    this.walletId = localStorage.getItem('walletId') || '';
    this.isTypeLoading = true;
    this.areInvestmentsLoading = true;

    // Calls investment type service to get
    // available investment types in database
    this.investmentTypeService.getInvestmentTypes().subscribe({
      next: (types) => {
        this.investmentTypes = types;
        this.isTypeLoading = false;
      },
      error: (err) => {
        this.isTypeLoading = false;
        console.error('An error occurred when trying to get investment types.', err);
      }
    });

    this.walletService.getWalletInvestments(Number(this.walletId)).subscribe({
      next: (investments) => {
        console.log("API Response:", investments);
        if (Array.isArray(investments) && Array.isArray(investments[0])) {
          this.walletInvestments = investments[0];
          this.filteredInvestments = [...this.walletInvestments];
        } else {
          console.error("Error: The API didn't return an array!", investments);
          this.walletInvestments = [];
        }
        this.areInvestmentsLoading = false;
      },
      error: (err) => {
        this.areInvestmentsLoading = false;
        console.error('An error occurred when trying to get wallet investments:', err);
      }
    });

    // WILL BE USED ON AVERAGE-PRICE DETAIL PAGE
    // Get the investment ID from the route parameters
    // this.investmentId = Number(this.route.snapshot.paramMap.get('investment_id'));
    // if (this.investmentId) {

    //   // Load available years for that investment
    //   this.investmentsService.getAvailableInvestmentYears(this.investmentId).subscribe({
    //     next: (response) => this.availableYears = response.availableYears,
    //     error: (err) => console.error('An error occurred when trying to get investment available years.', err),
    //   });

    //   // Load operations for the investment and year
    //   this.loadOperations(this.investmentId, this.searchYear);
    // }
  }

  onInvestmentTypeChange(): void {
    this.onSearch();
  }

  onSearch(): void {
    let investmentTypeSearch: number = Number(this.investmentType);

    this.filteredInvestments = this.walletInvestments.filter(investment => {
      return investmentTypeSearch === 0 || investment.investment_type_id === investmentTypeSearch;
    });
  }

  loadOperations(investmentId: number, year: number): void {
    this.isLoading = true;
    this.getOperationsByInvestmentId(investmentId, year).subscribe({
      next: (response) => {
        this.yearOperations = response.summary;  // Acesses the "summary" array
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching year summary:', err),
          this.isLoading = false;
      }
    });
  }

  // Method to get operations by investmentId and year
  getOperationsByInvestmentId(investmentId: number, year: number): Observable<{ summary: AveragePrice[] }> {
    return this.investmentsService.getYearOperationsSummary(investmentId, year);
  }
}
