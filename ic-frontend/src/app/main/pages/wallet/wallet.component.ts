import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet-service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  userId: number | null = 0;
  totalInvested: number | null = 0;

  constructor(
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    this.calculateTotalInvested();
  }

  calculateTotalInvested(): void {
    this.walletService.getTotalInvested().subscribe(
      (total: number) => {
        this.totalInvested = total;  // Atualiza a variável com o valor retornado
        console.log(this.totalInvested);  // Apenas para depuração
      },
      (error) => {
        console.error("Error fetching total invested:", error);  // Trata erros de requisição
      }
    );
  }

}
