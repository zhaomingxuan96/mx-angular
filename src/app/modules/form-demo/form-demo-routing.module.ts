import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoFirstComponent } from './demo-first/demo-first.component';
import { DemoThirdComponent } from './demo-third/demo-third.component';
import { DemoSecondComponent } from './demo-second/demo-second.component';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'first',
        pathMatch: 'full' // 完全匹配
      },
      {
        path: 'first',
        component: DemoFirstComponent
      },
      {
        path: 'second',
        component: DemoSecondComponent
      },
      {
        path: 'third',
        component: DemoThirdComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormDemoRoutingModule { }
