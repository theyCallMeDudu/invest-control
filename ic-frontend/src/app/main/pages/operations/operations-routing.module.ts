import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsComponent } from './operations.component';
import { OperationComponent } from '../operation/operation.component';

const routes: Routes = [
  { path: 'operations', component: OperationsComponent },
  { path: 'operation', component: OperationComponent },
  { path: 'operation/:operation_id', component: OperationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
