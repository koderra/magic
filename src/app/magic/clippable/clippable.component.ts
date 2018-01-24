import {Component, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'mg-clippable',
  templateUrl: './clippable.component.html',
  styleUrls: ['./clippable.component.css']
})
export class MgClippableComponent {

  @Input() value: string;

  clip() {

  }

}
