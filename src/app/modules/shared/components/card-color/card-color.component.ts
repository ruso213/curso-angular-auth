import { Component, Input, OnInit } from '@angular/core';
import { Colors, bgColor } from '@models/color.model';

@Component({
  selector: 'app-card-color',
  templateUrl: './card-color.component.html'
})
export class CardColorComponent{
  @Input() color:bgColor  = 'sky'
  styles  = Colors
  get colorBoard (){
    const classes = this.styles[this.color]
     return classes ? classes  : {}
  }
}
