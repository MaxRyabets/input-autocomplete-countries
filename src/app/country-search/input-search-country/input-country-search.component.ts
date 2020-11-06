import {Component, forwardRef, OnDestroy} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

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

export class InputCountrySearchComponent implements ControlValueAccessor, OnDestroy {
  subscriptions = [];
  val = new FormControl('');
  disabled: boolean;

  onTouch: any = () => {};

  registerOnChange(fn: any): void {
    this.subscriptions.push(
      this.val.valueChanges.subscribe(fn)
    );
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(val: any): void {
    this.val.setValue(val);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
