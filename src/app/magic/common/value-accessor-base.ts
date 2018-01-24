import {ControlValueAccessor} from "@angular/forms";
import {EventEmitter, Output} from "@angular/core";

export class ValueAccessorBase<T> implements ControlValueAccessor {
  private innerValue: T;

  @Output() ngModelChange: EventEmitter<string> = new EventEmitter();

  onChange = (_: any) => {
    this.ngModelChange.next(_);
  };

  onTouched = () => {
  };

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.onChange(value);
    }
  }

  touch() {
    this.onTouched();
  }


  writeValue(value: T) {
    this.innerValue = value;
  }


  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
