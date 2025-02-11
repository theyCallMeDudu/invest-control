import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet-service';
import { ChartData } from 'chart.js';
import { InvestmentTypeService } from 'src/app/services/investment-type.service';
import { InvestmentType } from 'src/app/shared/models/investment-type.model';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-investment-per-type',
  templateUrl: './investment-per-type.component.html',
  styleUrls: ['./investment-per-type.component.css']
})
export class InvestmentPerTypeComponent implements OnInit {
  investmentTypes: InvestmentType[] = [];
  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'], // Ajuste as cores, se necessário
      },
    ],
  };
  isLoading: boolean = false;

  constructor(
    private walletService: WalletService,
    private investmentTypeService: InvestmentTypeService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;

    // Search investment types before updating the chart
    this.investmentTypeService.getInvestmentTypes().subscribe({
      next: (types) => {
        this.investmentTypes = types; // Fills the array

        if (this.investmentTypes.length > 0) {
          this.updateChartData(); // Only calls if there is data
        } else {
          console.warn("None investment type found, the chart won't be updated.");
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error("An error occurred while trying to get investment types.");
        this.isLoading = false;
      }
    });
  }

  updateChartData() {
    const observables = this.investmentTypes.map((type) =>
      this.walletService.getTotalInvestedByType(type.investment_type_id).pipe(
        map((totalInvested) => {
          return {
            label: type.investment_type_name,
            total: totalInvested,
          };
        })
    ));

    forkJoin(observables).subscribe({
      next: (results) => {
        this.pieChartData = {
          labels: results.map((result) => result.label),
          datasets: [
            {
              data: results.map((result) => Number(result.total.total_invested)),
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
            },
          ],
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.error("An error occurred while trying to get investments per type.");
        this.isLoading = false;
      }
    });
  }

}
