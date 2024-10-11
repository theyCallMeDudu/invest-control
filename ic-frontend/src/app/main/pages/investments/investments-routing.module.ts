// src/app/main/pages/investments/investment-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentsComponent } from './investments.component';
import { InvestmentComponent } from '../investment/investment.component';

const routes: Routes = [
  { path: 'investments', component: InvestmentsComponent },
  { path: 'investment', component: InvestmentComponent },
  { path: 'investment/:investment_id', component: InvestmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestmentsRoutingModule { }
