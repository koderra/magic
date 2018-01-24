import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {ValueAccessorBase} from '../common/value-accessor-base';

@Component({
  selector: 'mg-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MgEditableComponent, multi: true}
  ]
})
export class MgEditableComponent extends ValueAccessorBase<string> implements OnInit {
  @Input('ngModel') value;
  @Input() save; // save callback
  @Input() multiLine = false; // allow enter + post processing
  @Input() editable = false;
  @Input() placeholder: string;

  private _active = false;
  private _busy = false;

  text = '';

  get busy() {
    return this._busy;
  }

  get active() {
    return this._active;
  }

  ngOnInit(): void {
    this.text = this.value;
  }

  activate() {
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  commit() {
    if (this.save) {
      this._busy = true;
      this._active = false;

      const promise = this.save(this.text);
      if (!promise || !(promise instanceof Promise)) {
        this._busy = false;
      } else {
        promise.then(() => {
          this._busy = false;
        }).catch((err) => {
          this._busy = false;
          console.log('Shit happened! ' + err);
        });
      }
    }
  }

  undo() {
    this.text = this.value;
  }

  remove() {
    // this._busy = true;
  }
}

// function noHTML() {
//   setTimeout(function() {
//     var str1 = ediv.innerText.replace(/\n/g,"");
//     var str2 = ediv.innerHTML.replace(/<br>/g,"");
//
//     if (str1 != str2) {
//       ediv.innerText = ediv.innerText;
//     }
//   }, 1);
// }
//
// // Remove markup when dropping something (e.g. image/ link)
// ediv.addEventListener("drop", noHTML);
// // Remove markup when pasting something (e.g. from Microsoft Word)
// ediv.addEventListener("paste", noHTML);
// // Remove markup from the clipboard when copying something
// ediv.addEventListener("copy", function(e) {
//   noHTML();
//   if (e.clipboardData) {
//     var text = window.getSelection().toString();
//     e.preventDefault();
//     e.clipboardData.setData('Text', text);
//   }
// });
// // Remove markup when the div gains focus
// ediv.addEventListener("focus", noHTML);
// // Remove markup when the div loses focus
// ediv.addEventListener("blur", noHTML);
