import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvestmentsService } from 'src/app/services/investments.service';
import { Investment } from 'src/app/shared/models/investment.model';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {

  investments: Investment[] = [];

  constructor(
    private router: Router,
    private investmentsService: InvestmentsService
  ) {}

  ngOnInit(): void {
    // Calls the service to get the investments
    this.investmentsService.getInvestments().subscribe({
      next: (data) => {
        this.investments = data;
        console.log(this.investments);
      },
      error: (err) => console.error('An error occurred while fetching investments', err)
    });
  }

  buttonConfig = {
    icon: 'fas fa-plus',
    styleClass: 'btn-standard',
    tooltip: 'New investment',
    action: () => this.router.navigate(['/investment'])  // Redirects to investment page
  };

}
