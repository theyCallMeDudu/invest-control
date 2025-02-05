import { Component, OnInit } from '@angular/core';
import { InvestmentTypeService } from 'src/app/services/investment-type.service';
import { WalletService } from 'src/app/services/wallet-service';
import { InvestmentType } from 'src/app/shared/models/investment-type.model';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  investmentTypes: InvestmentType[] = [];

  constructor(
    private walletService: WalletService,
    private investmentTypeService: InvestmentTypeService
  ) {}

  ngOnInit(): void {
    this.loadInvestmentData();
  }

  loadInvestmentData(): void {
    // Calls investment type service to get
    // available investment types in database
    this.investmentTypeService.getInvestmentTypes().subscribe({
      next: (types) => {
        this.investmentTypes = types.map(type => ({
          ...type,
          value: Math.floor(Math.random() * 5000) + 1000,
        }));
      },
      error: (err) => console.error('An error occurred when trying to get investment types.', err)
    });
  }

}
