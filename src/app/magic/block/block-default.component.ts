import {Component, Input, OnInit} from '@angular/core';
import {BlockReadyComponent, MgBlockComponent} from './block.component';


@Component({
  selector: 'mg-block-default',
  templateUrl: './block-default.component.html',
  styleUrls: ['./block-default.component.css']
})
export class MgBlockDefaultComponent implements OnInit, BlockReadyComponent {
  private _active = true;

  constructor(private _block: MgBlockComponent) {
    this._block.register(this);
  }

  private get active() {
    return this._active;
  }

  ready() {
    this._active = false;
  }

  ngOnInit(): void {
  }
}

