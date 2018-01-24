import {Component, OnInit, Input} from '@angular/core';
import {MgTabBarComponent} from './tab-bar.component';

@Component({
  selector: 'mg-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class MgTabComponent implements OnInit {
  @Input() title: string;
  @Input() watch: Array<string>;

  private _active = false;

  constructor(private tabBar: MgTabBarComponent) {
  }

  ngOnInit(): void {
    this.tabBar.register(this);
  }

  get active() {
    return this._active;
  }

  set active(value) {
    // console.log('ACT: ' + this.tabBar.value);
    // if (this.watch && this.watch.length > 0) {
    //   if (this.tabBar.value && this.watch.indexOf(this.tabBar.value) > -1) {
    //     this._active = value;
    //   }
    // } else {
    //
    // }
    this._active = value;
  }
}
