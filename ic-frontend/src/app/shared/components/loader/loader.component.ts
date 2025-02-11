import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() width: number = 100;
  @Input() height: number = 100;

  constructor() { }

  ngOnInit(): void {
  }

}
