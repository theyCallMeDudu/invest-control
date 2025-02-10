import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvestmentTypeService } from 'src/app/services/investment-type.service';
import { WalletService } from 'src/app/services/wallet-service';
import { InvestmentType } from 'src/app/shared/models/investment-type.model';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

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

  constructor(
    private walletService: WalletService,
    private investmentTypeService: InvestmentTypeService
  ) {}

  ngOnInit(): void {
    // Buscar os tipos de investimento antes de atualizar o gráfico
  this.investmentTypeService.getInvestmentTypes().subscribe((types) => {
    this.investmentTypes = types; // Fills the array

    if (this.investmentTypes.length > 0) {
      this.updateChartData(); // Only calls if there is data
    } else {
      console.warn("None investment type found, the chart won't be updated.");
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

    forkJoin(observables).subscribe((results) => {
      this.pieChartData = {
        labels: results.map((result) => result.label),
        datasets: [
          {
            data: results.map((result) => Number(result.total.total_invested)),
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          },
        ],
      };
    });
  }
}
