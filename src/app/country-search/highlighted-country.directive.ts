import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appHighlightedCountry]',
})
export class HighlightedCountryDirective implements  OnChanges {
  @Input() inputCountry: string;
  @Input() country: string;

  constructor(
    private el: ElementRef
  ) { }

  ngOnChanges(): void {
    if (!this.country.length || !this.inputCountry.length) {
      return;
    }

    const country = this.upperCaseFirstLetterCountry(this.inputCountry);

    const cutInputCountry = this.country.substr(this.inputCountry.length, this.country.length);

    this.el.nativeElement.innerHTML = `<b class="country-color">${country}</b>${cutInputCountry}`;
  }

  private upperCaseFirstLetterCountry(country: string): string {
    return country[0].toUpperCase() + country.slice(1);
  }
}


