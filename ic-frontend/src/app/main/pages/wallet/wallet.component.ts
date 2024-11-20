import { Component, OnInit } from '@angular/core';
import { OperationsService } from 'src/app/services/operations.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  constructor(
    private operationsService: OperationsService
  ) {}

  ngOnInit(): void {
    // this.getTotalInvested();
  }

}
