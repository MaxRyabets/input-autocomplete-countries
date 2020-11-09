import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Country} from './country.interface';
import {CountriesApiService} from './countries-api.service';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent implements OnInit {
  form = this.formBuilder.group({
    country: [''],
  });

  inputCountry = '';
  messageNotFoundCountry = '';

  countries: Country[] = [];
  isClickCountry = false;

  constructor(
    private formBuilder: FormBuilder,
    private countryApiService: CountriesApiService
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

            return;
          }
        }),
        debounceTime(300),
        distinctUntilChanged(),
        filter(country => country.length),
        switchMap(country => this.getCounty(country).pipe(
          catchError(err => of([]))
        )),
        tap(countries => {
          this.messageNotFoundCountry = countries.length ? '' : 'Country not found';
          this.countries = countries;
          this.inputCountry = this.form.get('country').value;
        }),
      ).subscribe();
  }

  private getCounty(country: string): Observable<Country[]> {
    return this.countryApiService.getCountry(country);
  }
}
