import {Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-input-country-search',
  templateUrl: './input-country-search.component.html',
  styleUrls: ['./input-country-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCountrySearchComponent),
      multi: true,
    },
  ],
})

export class InputCountrySearchComponent implements ControlValueAccessor {
  val = 0;
  disabled = false;

  onChange: any = () => {};
  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(val: any): void {
    if (!this.isValue(val)) {
      return;
    }

    this.changeTextContent(val);
  }

  private isValue(val: any): boolean {
    return val !== undefined && this.val !== val;
  }

  private changeTextContent(val: any): void {
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }
}
