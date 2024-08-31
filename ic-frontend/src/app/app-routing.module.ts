import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InvestmentsComponent } from './main/components/investments/investments.component';

const routes: Routes = [
  // Redirects to login by default
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Redirects to investments (main page)
  { path: 'investments', component: InvestmentsComponent },
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
