import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvestmentsComponent } from './investments.component';
import { InvestmentComponent } from '../investment/investment.component';
import { CustomRouteConfig } from 'src/app/shared/interfaces/custom-route-config';
import { AveragePriceComponent } from '../average-price/average-price.component';

export const investmentsRoutes: CustomRouteConfig[] = [
  { path: 'investments',
    component: InvestmentsComponent,
    showInSidebar: true
  }, // get investments
  { path: 'investments/new', component: InvestmentComponent }, // new investment
  { path: 'investments/:investment_id', component: InvestmentComponent },
  { path: 'investments/:investment_id/average-price', component: AveragePriceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(investmentsRoutes)],
  exports: [RouterModule]
})
export class InvestmentsRoutingModule { }
