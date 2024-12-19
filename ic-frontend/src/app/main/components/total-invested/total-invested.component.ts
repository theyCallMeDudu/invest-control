import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-invested',
  templateUrl: './total-invested.component.html',
  styleUrls: ['./total-invested.component.css']
})
export class TotalInvestedComponent implements OnInit {
  totalInvested: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
