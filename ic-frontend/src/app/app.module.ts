import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './main/pages/dashboard/dashboard.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { InvestmentsComponent } from './main/pages/investments/investments.component';
import { InvestmentComponent } from './main/pages/investment/investment.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    InvestmentsComponent,
    InvestmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      // timeOut: 3000, // How much time the toast is visible
      positionClass: 'toast-top-right', // Toast position on the screen
      preventDuplicates: true, // Avoid duplicated toasts
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
