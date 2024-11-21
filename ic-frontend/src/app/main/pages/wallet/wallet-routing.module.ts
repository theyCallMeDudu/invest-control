import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomRouteConfig } from 'src/app/shared/interfaces/custom-route-config';
import { WalletComponent } from './wallet.component';

export const walletRoutes: CustomRouteConfig[] = [
  { path: 'wallet/:wallet_id',
    component: WalletComponent,
    showInSidebar: true,
    menuRouteTitle: 'Wallet'
  }
];

@NgModule({
  imports: [RouterModule.forChild(walletRoutes)],
  exports: [RouterModule]
})
export class OperationsRoutingModule { }
