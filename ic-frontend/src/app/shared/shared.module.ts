import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';

@NgModule({
  declarations: [FormComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FormComponent] // Exporta o FormComponent para ser utilizado em outros módulos
})
export class SharedModule { }
