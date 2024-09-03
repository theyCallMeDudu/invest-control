import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IFormConfig, IFormField } from './form-config.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  @Input() config!: IFormConfig;
  @Output() submitForm = new EventEmitter<{ [key: string]: any }>();

  formValues: { [key: string]: any } = {};

  onSubmit() {
    this.submitForm.emit(this.formValues);
  }
}
