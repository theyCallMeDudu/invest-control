// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/pages/dashboard/dashboard.component';
import { InvestmentsRoutingModule } from './main/pages/investments/investments-routing.module';
import { OperationsRoutingModule } from './main/pages/operations/operations-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirects to login page by default
  { path: 'dashboard', component: DashboardComponent }     // Redirect to dashboard (main page)
];

@NgModule({
  imports: [
    // Main application routes
    RouterModule.forRoot(routes),
    // Investments routes
    InvestmentsRoutingModule,
    // Operations routes
    OperationsRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
