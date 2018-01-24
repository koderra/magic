import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {MgTabComponent} from './tab.component';

import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {ValueAccessorBase} from '../common/value-accessor-base';


@Component({
  selector: 'mg-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MgTabBarComponent, multi: true}
  ]
})
export class MgTabBarComponent extends ValueAccessorBase<string> implements OnInit {
  private _tabs: MgTabComponent[] = [];

  ngOnInit(): void {
  }

  get tabs() {
    const rtabs = [];
    for (const tab of this._tabs) {
      if (tab.watch && tab.watch.length > 0) {
        if (tab.watch.indexOf(this.value) > -1) {
          rtabs.push(tab);
        }
      } else {
        rtabs.push(tab);
      }
    }

    return rtabs;
  }

  register(tab: MgTabComponent) {
    this._tabs.push(tab);
    if (this._tabs.length === 1) {
      tab.active = true;
    }
  }

  select(tab) {
    for (const t of this._tabs) {
      t.active = t === tab;
    }
  }
}

