import {Component, Input, OnInit} from '@angular/core';
import {MgNavBarComponent} from './navbar.component';

@Component({
  selector: 'mg-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class MgNavComponent implements OnInit {

  @Input() zone: Array<string>;
  @Input() exclude: Array<string>;   // exclude zones
  @Input() feature;
  @Input() navigate: string;
  @Input() track = true;
  @Input() permissions: Array<string>; // user permissions required to show

  @Input()
  set enabled(value) {
    this._enabled = Boolean(value);
  }

  private _enabled = true;
  private _active = false;

  constructor(private navbar: MgNavBarComponent) {
  }

  ngOnInit() {
    if (this.track === true) {
      this.navbar.register(this);
    }
  }

  get enabled() {
    return this._enabled;
  }

  get active() {
    return this._active;
  }

  refresh(active: MgNavComponent, zone: string, permissions: Array<string>) {
    this._active = this === active;
    this._enabled = !(this.zone && this.zone.indexOf(zone) === -1);
    this._enabled = this.exclude && this.exclude.indexOf(zone) !== -1 ? false : this._enabled;


    if (this._enabled) {
      if (this.permissions) {
        if (this.permissions.length === 0 && permissions.length > 0) {
          this._enabled = false;
          return;
        } else if (this.permissions.length > 0 && permissions.length === 0) {
          this._enabled = false;
          return;
        } else if (this.permissions.length > 0 && permissions.length > 0) {
          for (const expectedPermission of this.permissions) {
            for (const actualPermission of permissions) {
              if (expectedPermission === actualPermission) {
                return;
              }
            }
          }
          this.enabled = false;
        }
      }
    }
  }

  clicked() {
    if (this.track === true) {
      this._active = true;
      this.navbar.activate(this);
    }
  }
}
