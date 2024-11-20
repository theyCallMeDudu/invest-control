import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WalletComponent } from './main/pages/wallet/wallet.component';
import { investmentsRoutes } from './main/pages/investments/investments-routing.module';
import { operationsRoutes } from './main/pages/operations/operations-routing.module';
import { CustomRouteConfig } from './shared/interfaces/custom-route-config';
import { walletRoutes } from './main/pages/wallet/wallet-routing.module';

export const routes: CustomRouteConfig[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login page
  // { path: 'wallet',
  //   component: WalletComponent,
  //   showInSidebar: true
  // },   // Wallet route
  ...walletRoutes, // Append wallet routes
  ...investmentsRoutes, // Append investments routes
  ...operationsRoutes // Append operations routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
