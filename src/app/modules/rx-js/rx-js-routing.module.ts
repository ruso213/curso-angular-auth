import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticaRxJsComponent } from './components/practica-rx-js/practica-rx-js.component';

const routes: Routes = [
  {
    path: '',
    component: PracticaRxJsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxJsRoutingModule { }
