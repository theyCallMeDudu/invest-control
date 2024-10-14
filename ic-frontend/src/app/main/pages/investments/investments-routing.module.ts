import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvestmentsComponent } from './investments.component';
import { InvestmentComponent } from '../investment/investment.component';
import { CustomRouteConfig } from 'src/app/shared/interfaces/custom-route-config';

export const investmentsRoutes: CustomRouteConfig[] = [
  { path: 'investments',
    component: InvestmentsComponent,
    showInSidebar: true
  },
  { path: 'investment', component: InvestmentComponent },
  { path: 'investment/:investment_id', component: InvestmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(investmentsRoutes)],
  exports: [RouterModule]
})
export class InvestmentsRoutingModule { }
