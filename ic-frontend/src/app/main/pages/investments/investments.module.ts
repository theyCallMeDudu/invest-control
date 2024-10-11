import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentsComponent } from './investments.component';
import { InvestmentComponent } from '../investment/investment.component';
import { InvestmentsRoutingModule } from './investments-routing.module';

@NgModule({
  declarations: [
    InvestmentsComponent,
    InvestmentComponent
  ],
  imports: [
    CommonModule,
    InvestmentsRoutingModule
  ]
})
export class InvestmentModule { }
