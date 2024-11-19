import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardComponent } from './components/card/card.component';
import { RouterModule } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    FormComponent,
    SidebarComponent,
    CardComponent,
    ButtonComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  // Exports to be reused all over the system
  exports: [
    FormComponent,
    SidebarComponent,
    CardComponent,
    ButtonComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
