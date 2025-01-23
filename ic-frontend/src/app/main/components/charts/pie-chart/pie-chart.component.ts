import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';

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
export class PieChartComponent{

  // Mock data
  pieChartData: ChartData<'pie'> = {
    labels: ['STOCK', 'REIT'],
    datasets: [
      {
        data: [5000, 3000], // Mocked investment totals
        backgroundColor: ['#42A5F5', '#66BB6A'],
      },
    ],
  };

  // Chart options
  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false, // allows manual size control
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

}
