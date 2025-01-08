import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet-service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
  }

}
