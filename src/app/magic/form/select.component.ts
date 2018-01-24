import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {ValueAccessorBase} from '../common/value-accessor-base';


@Component({
  selector: 'mg-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MgSelectComponent, multi: true}
  ],
})
export class MgSelectComponent extends ValueAccessorBase<string> implements OnInit {

  private _options;
  private _optionsVisible = false;

  optionNames;
  displayText;

  @Input('ngModel') value;
  @Input() placeholder = '';
  @Input() type;
  @Input() edit = false;
  @Input() decorator;

  @Input()
  set options(value) {
    this._options = value;
    this.optionNames = Object.getOwnPropertyNames(this._options);
  }

  get options() {
    return this._options;
  }

  get optionsVisible() {
    return this._optionsVisible;
  }

  select(name: string) {
    const opt = this._options[name];
    if (opt) {
      this.value = name;
      this.displayText = this._options[name];
      this.activated();
    }
  }

  activated() {
    this._optionsVisible = !this._optionsVisible;
  }

  ngOnInit(): void {
  }
}

