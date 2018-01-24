import {Component, Input, Renderer2, ElementRef, OnInit} from '@angular/core';
import {MgCarouselComponent} from './carousel.component';

@Component({
  selector: 'mg-carousel-slide',
  templateUrl: './carousel-slide.component.html',
  styleUrls: ['./carousel-slide.component.css']
})
export class MgCarouselSlideComponent {
  private _active = false;
  private _ready = true; // TODO: change to false
  private _cover = false;

  @Input()
  set cover(value: boolean) {
    this._cover = value;
    if (this._cover === true) {
      this.visible = true;
    }
  }

  get cover() {
    return this._cover;
  }

  visible = false;

  constructor(private carousel: MgCarouselComponent) {
    carousel.register(this);
  }

  get active() {
    return this._active;
  }

  set active(active: boolean) {
    this._active = active;
  }

  get ready() {
    return this._ready;
  }

  hide(animate?: string) {
    this.visible = false;
  }

  show(animate?: string) {
    if (this.cover !== true) {
      this.visible = true;
    } else {
      this.visible = true;
    }
  }
}
