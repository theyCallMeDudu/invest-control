import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRouteConfig } from 'src/app/shared/interfaces/custom-route-config';
import { AveragePriceComponent } from './average-price.component';

export const averagePriceRoutes: CustomRouteConfig[] = [
  {
    path: 'average-price',
    component: AveragePriceComponent,
    showInSidebar: true,
    menuRouteTitle: 'Average Price'
  },
  { path: 'average-price', component: AveragePriceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(averagePriceRoutes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
