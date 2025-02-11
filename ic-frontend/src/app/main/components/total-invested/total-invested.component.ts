import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet-service';

@Component({
  selector: 'app-total-invested',
  templateUrl: './total-invested.component.html',
  styleUrls: ['./total-invested.component.css']
})
export class TotalInvestedComponent implements OnInit {
  totalInvested: { total_invested: number } | null = null;
  isLoading: boolean = false;

  constructor(
    private walletService: WalletService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.calculateTotalInvested();
  }

  calculateTotalInvested(): void {
    this.walletService.getTotalInvested().subscribe(
      (response: { total_invested: number }) => {

        // Assign the entire response object to totalInvested
        this.totalInvested = response;
        this.isLoading = false;
      },
      (error) => {
        this.totalInvested = null; // Reset to null in case of an error
        this.isLoading = false;
        console.error('Error fetching total invested:', error); // Handle errors
      }
    );
  }

}
