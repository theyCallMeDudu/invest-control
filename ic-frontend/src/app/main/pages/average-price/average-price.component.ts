import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { InvestmentsService } from 'src/app/services/investments.service';
import { AveragePrice } from 'src/app/shared/models/average-price.model';
import { Operation } from 'src/app/shared/models/operation.model';

@Component({
  selector: 'app-average-price',
  templateUrl: './average-price.component.html',
  styleUrls: ['./average-price.component.css']
})
export class AveragePriceComponent implements OnInit {
  searchYear: number = new Date().getFullYear();
  investmentId: number | null = null;
  yearOperations: AveragePrice[] = [];

  constructor(
    private route: ActivatedRoute,
    private investmentsService: InvestmentsService
  ) {}

  ngOnInit(): void {
    // Get the investment ID from the route parameters
    this.investmentId = Number(this.route.snapshot.paramMap.get('investment_id'));

    // Load operations for the investment and year
    if (this.investmentId) {
      this.loadOperations(this.investmentId, this.searchYear);
    }
  }

  onSearch(): void {
    if (this.investmentId) {
      this.loadOperations(this.investmentId, this.searchYear);
    }
  }

  loadOperations(investmentId: number, year: number): void {
    this.getOperationsByInvestmentId(investmentId, year).subscribe({
      next: (response) => {
        this.yearOperations = response.summary;  // Acesses the "summary" array
        console.log('Year Operations Summary:', this.yearOperations);
      },
      error: (err) => console.error('Error fetching year summary:', err)
    });
}

  // Method to get operations by investmentId and year
  getOperationsByInvestmentId(investmentId: number, year: number): Observable<{ summary: AveragePrice[] }> {
    return this.investmentsService.getYearOperationsSummary(investmentId, year);
  }
}
