import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './main/pages/dashboard/dashboard.component';
import { investmentsRoutes } from './main/pages/investments/investments-routing.module';
import { operationsRoutes } from './main/pages/operations/operations-routing.module';
import { CustomRouteConfig } from './shared/interfaces/custom-route-config';

export const routes: CustomRouteConfig[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login page
  { path: 'dashboard',
    component: DashboardComponent,
    showInSidebar: true
  },   // Dashboard route
  ...investmentsRoutes, // Append investments routes
  ...operationsRoutes // Append operations routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
