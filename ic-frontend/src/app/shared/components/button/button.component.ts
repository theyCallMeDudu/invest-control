import { Component, Input, OnInit } from '@angular/core';
import { IButtonConfig } from '../../interfaces/button-config';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() buttonConfig!: IButtonConfig;

  // Called when the button is clicked
  handleClick(): void {
    if (this.buttonConfig.action) {
      this.buttonConfig.action();  // Executes the action if it was passed
    }
  }
}
