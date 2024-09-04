import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/components/dashboard/dashboard.component';

const routes: Routes = [
  // Redirects to login by default
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Redirects to investments (main page)
  { path: 'dashboard', component: DashboardComponent },
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
