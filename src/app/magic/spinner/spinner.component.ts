import {Component, Input, Renderer2, ElementRef, OnInit, Directive} from '@angular/core';

@Component({
  selector: 'mg-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class MgSpinnerComponent implements OnInit {

  private _mode = 'thick';
  private _size = 50;

  @Input()
  set size(value: number) {
    this._size = Number(value);
  }

  get size() {
    return this._size;
  }

  @Input()
  set mode(value: string) {
    this._mode = ['thick', 'medium', 'thin'].indexOf(value) > -1 ? value : 'thick';
  };

  get mode() {
    return this._mode;
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }
}
