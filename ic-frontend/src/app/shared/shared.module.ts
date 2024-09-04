import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    FormComponent,
    SidebarComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  // Exports to be reused all over the system
  exports: [
    FormComponent,
    SidebarComponent,
    CardComponent
  ]
})
export class SharedModule { }
