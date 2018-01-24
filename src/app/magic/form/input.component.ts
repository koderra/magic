import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {ValueAccessorBase} from '../common/value-accessor-base';


@Component({
  selector: 'mg-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MgInputComponent, multi: true}
  ],
})
export class MgInputComponent extends ValueAccessorBase<string> implements OnInit {
  @Input('ngModel') value;
  @Input() placeholder = '';

  @Input() activatorStyle;
  @Input() decorator;

  @Output() activated = new EventEmitter<string>();

  private _focused = false;
  private _activatorEbabled = false;

  get activatorEnabled() {
    return this._activatorEbabled;
  }

  get focused() {
    return this._focused;
  }

  focus(status: boolean) {
    this._focused = status;
  }

  activate() {
    if (this.activated) {
      this.activated.emit(this.value);
    }
  }

  ngOnInit(): void {
    this._activatorEbabled = this.activated.observers.length > 0;
  }
}

