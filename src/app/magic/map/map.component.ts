import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {ValueAccessorBase} from '../common/value-accessor-base';


@Component({
  selector: 'mg-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MgMapComponent, multi: true}
  ],
})
export class MgMapComponent extends ValueAccessorBase<string> implements OnInit {
  @Input('ngModel') value;
  @Input() placeholder = '';
  @Input() decorator;
  @Input() activatorStyle = 'fa-circle';

  @Output() activated = new EventEmitter<string>();

  private _detailVisible = false;

  get detailVisible() {
    return this._detailVisible;
  }

  activate() {
    this._detailVisible = !this._detailVisible;
  }

  ngOnInit(): void {
  }
}

