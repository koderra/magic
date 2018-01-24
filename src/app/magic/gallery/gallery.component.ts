import {Component, Input, Renderer2, ElementRef, OnInit, Directive} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {ValueAccessorBase} from '../common/value-accessor-base';

@Component({
  selector: 'mg-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MgGalleryComponent, multi: true}
  ]
})
export class MgGalleryComponent extends ValueAccessorBase<Array<string>> implements OnInit {
  @Input('ngModel') images;
  @Input() prefix;
  @Input() suffix;

  @Input() upload;  // upload service URL
  @Input() meta;    // meta data to push with upload
  @Input() token;   // OAuth bearer token
  @Input() acceptDrop;

  @Input() onLoaded;
  @Input() onError;
  @Input() onUploaded;

  private _busy = false;
  private _state;
  private _last_state;

  get state() {
    return this._state;
  }

  constructor(private elementRef: ElementRef) {
    super();
  }

  ngOnInit(): void {
    if (this.acceptDrop === true || this.acceptDrop === 'true') {
      this.initDrop();
    }
  }

  imageUploadCallback = (params: string, callback) => {
    const res = JSON.parse(params);
    console.log('Got callback params: ' + JSON.stringify(res));

    if (this.onUploaded) {
      this.onUploaded(params, (err, data) => {
        if (callback) {
          callback();
        }
      });
    }
  };

  private uploadFile(file, callback) {
    console.log('UPL file: ' + typeof this.images);
    this.images.push(file);
  }

  private initDrop() {
    const container = this.elementRef.nativeElement.querySelector('div');
    container.ondragenter = () => {
      if (!this._busy) {
        if (!this._last_state) {
          this._last_state = this._state;
        }
        this._state = 'drag';
        console.log('enter');
      }
    };
    container.ondragover = (ev) => {
      ev.preventDefault();
    };
    container.ondragleave = () => {
      if (!this._busy) {
        this._state = this._last_state;
        this._last_state = null;
        console.log('leave');
      }
    };
    container.ondrop = (ev) => {
      if (!this._busy) {
        this._state = this._last_state;
        this._last_state = null;
        ev.preventDefault();
        console.log('DRO: ' + ev.dataTransfer.files[0].name);
        const file = ev.dataTransfer.files[0];

        this.uploadFile(file, () => {
          console.log('File uploaded');
        });
      }
    };
  }


}
