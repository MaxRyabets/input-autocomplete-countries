import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {Country} from './country.interface';
import {CountriesApiService} from './countries-api.service';
import {debounceTime, distinctUntilChanged, filter, map, skipWhile, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountrySearchComponent implements OnInit {
  form = this.formBuilder.group({
    country: [''],
  });

  inputCountry = '';
  messageFoundedCountry = '';

  countries: Country[] = [];
  isClickCountry = false;

  constructor(
    private formBuilder: FormBuilder,
    private countryApiService: CountriesApiService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getValueChangesFromCountry();
  }

  trackByFn(index, item): number {
    return item.id;
  }

  onClickCountry(country: string): void {
    this.isClickCountry = true;
    this.form.controls.country.setValue(country);
  }

  private getValueChangesFromCountry(): void {
    this.form.get('country')
      .valueChanges
      .pipe(
        map(country => country.trim()),
        tap(country => {
          if (!country.length) {
            this.countries = [];
          }
        }),
        filter(country => country.length),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(country => this.getCounty(country)),
        tap(countries => {
          this.countries = countries;
          this.inputCountry = this.form.get('country').value;
          this.messageFoundedCountry = countries.length ? '' : 'not found';
          this.cdRef.detectChanges();
        }),
      ).subscribe();
  }

  private getCounty(country: string): Observable<Country[]> {
    return this.countryApiService.getCountry(country);
  }
}
