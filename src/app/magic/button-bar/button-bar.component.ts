import {Component, Input, OnInit} from '@angular/core';
import {MgButtonBarButtonComponent} from "./button-bar-button.component";
import {ValueAccessorBase} from "../common/value-accessor-base";
import {DEFAULT_VALUE_ACCESSOR} from "@angular/forms/src/directives/default_value_accessor";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'mg-button-bar',
  templateUrl: './button-bar.component.html',
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MgButtonBarComponent, multi: true}
  ] // providers: [DEFAULT_VALUE_ACCESSOR, useExisting: MgButtonBarComponent, multi: true]
})
export class MgButtonBarComponent extends ValueAccessorBase<string> implements OnInit {
  // @Input('ngModel') value;

  activate(button: MgButtonBarButtonComponent) {
    this.value = button.name;
  }

  active(): string {
    return this.value
  }

  constructor() {
    super();
    console.log('Model value: ' + this.value);
  }

  ngOnInit(): void {
    console.log('XModel value: ' + this.value);
  }
}
