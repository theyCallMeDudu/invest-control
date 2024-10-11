import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationsComponent } from './operations.component';
import { OperationComponent } from '../operation/operation.component';
import { OperationsRoutingModule } from './operations-routing.module';

@NgModule({
  declarations: [
    OperationsComponent,
    OperationComponent
  ],
  imports: [
    CommonModule,
    OperationsRoutingModule  // Importa o módulo de rotas das operações
  ]
})
export class OperationModule { }
