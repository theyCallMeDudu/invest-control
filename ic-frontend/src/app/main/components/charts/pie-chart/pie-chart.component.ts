import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { InvestmentTypeService } from 'src/app/services/investment-type.service';
import { InvestmentType } from 'src/app/shared/models/investment-type.model';

@Component({
  selector: 'app-pie-chart',
  template: `
    <div style="width: 400px; margin: auto;">
      <canvas
        baseChart
        [data]="pieChartData"
        [type]="'pie'"
        [options]="chartOptions">
      </canvas>
    </div>
  `,
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {

  @Input() investmentTypes: InvestmentType[] = [];

  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
      },
    ],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['investmentTypes'] && this.investmentTypes) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    this.pieChartData.labels = this.investmentTypes.map(inv_type => inv_type.investment_type_name);
    this.pieChartData.datasets[0].data = this.investmentTypes.map(() => Math.floor(Math.random() * 5000) + 1000)
  }

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

}
