import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxJsRoutingModule } from './rx-js-routing.module';
import { PracticaRxJsComponent } from './components/practica-rx-js/practica-rx-js.component';


@NgModule({
  declarations: [
    PracticaRxJsComponent
  ],
  imports: [
    CommonModule,
    RxJsRoutingModule
  ]
})
export class RxJsModule { }
