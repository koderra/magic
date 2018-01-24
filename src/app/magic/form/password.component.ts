import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {ValueAccessorBase} from '../common/value-accessor-base';


@Component({
  selector: 'mg-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MgPasswordComponent, multi: true}
  ],
})
export class MgPasswordComponent extends ValueAccessorBase<string> implements OnInit {
  @Input('ngModel') value;
  @Input() placeholder = '';
  @Input() type;

  @Input() activator;
  @Input() activatorStyle;
  @Input() decorator;

  private _optionsVisible = false;

  get optionsVisible() {
    return this._optionsVisible;
  }

  activate() {
    if (this.activator) {
      this.activator(this.value);
    }
  }

  ngOnInit(): void {
    if (this.type === 'select') {
      this.initSelect();
    }
  }

  // private

  private selectActivator = () => {
    this._optionsVisible = !this._optionsVisible;
  };

  private initSelect() {
    this.activator = this.selectActivator;
    this.activatorStyle = 'fa-chevron-circle-down'; //caret-down
  }

}

