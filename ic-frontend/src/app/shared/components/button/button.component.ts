import { Component, Input, OnInit } from '@angular/core';
import { IButtonConfig } from '../../interfaces/button-config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() buttonConfig!: IButtonConfig;

  ngOnInit() {
    if (!this.buttonConfig) {
      console.error('buttonConfig is undefined in ButtonComponent');
    }
  }

  // Called when the button is clicked
  handleClick(): void {
    if (this.buttonConfig.action) {
      this.buttonConfig.action();  // Executes the action if it was passed
    }
  }
}
