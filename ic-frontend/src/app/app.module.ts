import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskDirective, NgxMaskPipe, NgxMaskModule } from 'ngx-mask';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { WalletComponent } from './main/pages/wallet/wallet.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SharedModule } from './shared/shared.module';
import { InvestmentsComponent } from './main/pages/investments/investments.component';
import { InvestmentComponent } from './main/pages/investment/investment.component';
import { FormsModule } from '@angular/forms';
import { OperationComponent } from './main/pages/operation/operation.component';
import { OperationsComponent } from './main/pages/operations/operations.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AveragePriceComponent } from './main/pages/average-price/average-price.component';
import { TotalInvestedComponent } from './main/components/total-invested/total-invested.component';

registerLocaleData(localePt, 'pt-BR', localePtExtra);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InvestmentsComponent,
    InvestmentComponent,
    OperationComponent,
    OperationsComponent,
    AveragePriceComponent,
    WalletComponent,
    TotalInvestedComponent
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
    }),
    NgxMaskModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    // Defines locale to pt-BR
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
