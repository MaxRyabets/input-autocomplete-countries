import {AfterViewInit, Directive, ElementRef, HostBinding, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlightedCountry]'
})
export class HighlightedCountryDirective implements AfterViewInit{
  @Input() country: string;
  @Input('appHighlightedCountry') inputCountry: string;

  @HostBinding('style.color') elColor = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {

    const cutInputCountry =  this.country.substr(this.inputCountry.length, this.country.length);

    this.el.nativeElement.innerHTML = this.el.nativeElement.
    innerHTML.replace(new RegExp(`${this.country}`, 'g'),
      `<b class="special">${this.inputCountry}</b>${cutInputCountry}`);
  }

}
