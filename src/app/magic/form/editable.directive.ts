import {Directive, ElementRef, Host, HostBinding, HostListener, Input, OnInit} from '@angular/core';
import {NgModel} from '@angular/forms';

@Directive({
  selector: 'div[mg]',
  providers: [NgModel]
})
export class MgEditableDirective implements OnInit {
  private _editable = false;
  private _text = '';
  private _elem;
  private _showingPlaceholder = false;
  private _loaded = false;

  @Input() placeholder = '';

  @Input()
  set editable(value: boolean) {
    this._editable = value;
    this.updateEditable()
  }

  @HostListener('focus')
  onFocus() {
    if (this._showingPlaceholder) {
      this._text = '';
      this.updateEditable();
    }
  }

  @HostListener('blur')
  onBlur() {
    this._text = this.getText();
    if (this._text.trim().length === 0) {
      this._text = this.placeholder;
      this._showingPlaceholder = true;
      this.updateEditable();
    }
  }

  @HostListener('keydown')
  onKeyDown() {
    this._showingPlaceholder = false;
    this._text = this.getText();
    this.ngModel.update.emit(this._text);
  }

  @HostListener('keyup')
  onKeyUp() {
    this._text = this.getText();
    this.ngModel.update.emit(this._text);
  }

  @HostListener('drop')
  onDrop() {
  }

  @HostListener('paste')
  onPaste() {
  }

  @HostListener('copy')
  onCopy() {
  }

  constructor(private elementRef: ElementRef, private ngModel: NgModel) {
    this._elem = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.ngModel.valueChanges.subscribe(val => {
      this._text = val;
      if (!this._loaded) {
        this.updateEditable();
        this._loaded = true;
      }
    });

    this._text = this.placeholder || '';
    this.updateEditable();
  }

  private getText() {
    return this._elem.innerText;
  }

  private updateEditable() {
    this._elem.innerText = this._text || '';
    this._elem.contentEditable = '' + this._editable;
  }
}
