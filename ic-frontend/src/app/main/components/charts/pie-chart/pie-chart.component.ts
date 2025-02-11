import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
export class PieChartComponent {

  @Input() pieChartData!: ChartData<'pie'>; // Recebe os dados via @Input

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
