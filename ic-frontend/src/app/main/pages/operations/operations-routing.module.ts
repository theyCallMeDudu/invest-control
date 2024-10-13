import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OperationsComponent } from './operations.component';
import { OperationComponent } from '../operation/operation.component';
import { CustomRouteConfig } from 'src/app/shared/interfaces/custom-route-config';

export const operationsRoutes: CustomRouteConfig[] = [
  { path: 'operations',
    component: OperationsComponent,
    showInSidebar: true
  },
  { path: 'operation', component: OperationComponent },
  { path: 'operation/:operation_id', component: OperationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(operationsRoutes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
