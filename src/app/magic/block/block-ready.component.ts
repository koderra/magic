import {Component, Input, OnInit} from '@angular/core';
import {BlockReadyComponent, MgBlockComponent} from './block.component';


@Component({
  selector: 'mg-block-ready',
  templateUrl: './block-ready.component.html',
  styleUrls: ['./block-ready.component.css']
})
export class MgBlockReadyComponent implements OnInit, BlockReadyComponent {
  private _active = false;

  constructor(private _block: MgBlockComponent) {
    this._block.register(this);
  }

  private get active() {
    return this._active;
  }

  ready() {
    this._active = true;
  }

  ngOnInit(): void {
  }
}

