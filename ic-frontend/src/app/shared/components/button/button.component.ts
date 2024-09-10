import { Component, Input, OnInit } from '@angular/core';
import { IButtonConfig } from '../../interfaces/button-config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() config!: IButtonConfig;
}
