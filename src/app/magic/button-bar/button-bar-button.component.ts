import {Component, Input} from '@angular/core';
import {MgButtonBarComponent} from "./button-bar.component";

@Component({
  selector: 'mg-button-bar-button',
  templateUrl: './button-bar-button.component.html'
})
export class MgButtonBarButtonComponent {
  @Input() name = '';

  constructor(private buttonBar: MgButtonBarComponent) {
  }

  activate() {
    this.buttonBar.activate(this);
  }

  get isActive() {
    return this.buttonBar.active() === this.name;
  }
}
