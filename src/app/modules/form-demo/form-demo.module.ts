import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDemoRoutingModule } from './form-demo-routing.module';
import { DemoFirstComponent } from './demo-first/demo-first.component';
import { DemoThirdComponent } from './demo-third/demo-third.component';
import { DemoSecondComponent } from './demo-second/demo-second.component';


@NgModule({
  declarations: [
    DemoFirstComponent,
    DemoSecondComponent,
    DemoThirdComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormDemoRoutingModule
  ]
})
export class FormDemoModule { }