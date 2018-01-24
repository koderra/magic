import {Component, Input, Renderer2, ElementRef, OnInit, Directive} from '@angular/core';

@Component({
  selector: 'mg-img',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class MgImageComponent implements OnInit {
  @Input() prefix = ''; // prepend to image src url
  @Input() suffix = ''; // append to the image src url

  @Input() mode = '';   // round | anything else = default
  @Input() spinnerMode: string;   // round | anything else = default
  @Input() spinnerSize = 50;   // round | anything else = default

  @Input('default') defaultImage;
  @Input() loading;
  @Input() error;
  @Input() upload;  // upload service URL
  @Input() meta;    // meta data to push with upload
  @Input() token;   // OAuth bearer token
  @Input() acceptDrop;
  @Input() autoUpload;

  @Input() onLoaded;
  @Input() onError;
  @Input() onUploaded;

  @Input()
  set src(value) {
    this._src = value;
    if (this.src) {
      if (typeof this._src === 'string') {
        this.loadImage();
      } else {
        this.loadPreview(this._src, (err) => {
          if (err) {
            return console.log('Error loading file: ' + err);
          }

          if (Boolean(this.autoUpload)) {
            this.uploadFile(this.src, (uploadError, result) => {
              console.log('Upload returned: ' + uploadError + ' / ' + JSON.stringify(result));
            });
          }
        });
      }
    } else if (this.defaultImage) {
      this.activeImage = this.defaultImage;
    }
  }

  get src() {
    return this._src;
  }

  activeImage;

  private _src;
  private _state = 'init';
  private _busy = false;
  private _last_state;

  get state() {
    return this._state;
  }

  get busy() {
    return this._busy;
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  private loadPreview(file, callback) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const image = new Image();
      image.src = ev.target['result'];
      this.activeImage = image.src;
      callback();
    };
    reader.onerror = (ev) => {
    };
    reader.onprogress = (ev) => {
    };

    reader.readAsDataURL(file);
  }

  private uploadFile(file, callback) {
    const formData = new FormData();
    const xhr = new XMLHttpRequest();

    formData.append('file', file);
    xhr.open('POST', 'http://localhost:8003/v1/file/21e926e6-7adc-4b89-8c4f-2628971c6ae2');
    xhr.setRequestHeader('authorization', 'Bearer qzU18avXMLQVnMOvaGZYouNwMko=');

    xhr.addEventListener('load', (ev) => {
      // console.log('load: ' + ev);
      // console.log('RES: ' + xhr.responseText);
      if (this.onUploaded) {
        this.onUploaded(xhr.responseText, (err) => {
          // this.removeSpinner();
          this._busy = false;
        });
      } else {
        // this.removeSpinner();
        this._busy = false;
      }
    });

    xhr.upload.addEventListener('error', (ev) => {
      console.log('Error uploading file: ' + ev);
      console.log('RESE: ' + xhr.responseText);
    });

    xhr.upload.addEventListener('progress', (pe) => {
      if (pe.lengthComputable) {
        console.log('Total: ' + pe.total);
        console.log('Val: ' + pe.loaded);
      }
    });

    xhr.addEventListener('loadend', (ev) => {
      console.log('loadend: ' + ev);
      console.log('RES: ' + xhr.responseText);
    });

    // this.showSpinner();
    this._busy = true;
    xhr.send(formData);
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
        this.loadPreview(file, () => {
          console.log('File displayed');
          this.uploadFile(file, () => {
            console.log('File uploaded');
          });
        });
      }
    };
  }

  private loadImage() {
    this._state = 'loading';
    this._busy = true;
    if (this.loading) {
      this.activeImage = this.loading;
    } else {
      this.activeImage = this.defaultImage;
    }

    const image = new Image();
    image.addEventListener('load', () => {
      setTimeout(() => {
        this._state = 'ready';
        this.activeImage = image.src;
        // this.removeSpinner();
        this._busy = false;
      }, 300);
    });

    image.addEventListener('error', () => {
      if (this.error) {
        // this.removeSpinner();
        this._busy = false;
        this.activeImage = this.error;
      } else if (this.defaultImage) {
        this.activeImage = this.defaultImage;
      }

      console.log('Error loading image');
    });
    image.src = this.prefix + this.src + this.suffix;
  }

  ngOnInit(): void {

    if (Boolean(this.acceptDrop)) {
      this.initDrop();
    }

    if (!this._src && this.defaultImage) {
      this.activeImage = this.defaultImage;
    }

  }
}
