import {Component, Input, OnInit} from '@angular/core';

export interface BlockReadyComponent {
  ready: () => void;
}

@Component({
  selector: 'mg-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class MgBlockComponent implements OnInit {
  private _value;
  private _ready = false;
  private components: Array<BlockReadyComponent> = [];

  @Input() showSpinner;

  @Input('watch')
  set watch(value) {
    this._value = value;
    if (!!value) {
      this.ready();
    }
  }

  get isReady() {
    return this._ready;
  }

  ready() {
    this._ready = true;
    for (const comp of this.components) {
      comp.ready();
    }
  }

  register(component: BlockReadyComponent) {
    this.components.push(component);
  }

  ngOnInit(): void {
  }
}

