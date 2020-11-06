import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {fromEvent, Observable, of, Subject} from 'rxjs';
import {Country} from './country.interface';
import {CountriesApiService} from './countries-api.service';
import {concatMap, delay, filter, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent implements OnInit, AfterViewInit, OnDestroy {
  form = this.formBuilder.group({
    country: [''],
  });

  messageFoundedCountry = '';

  destroy$ = new Subject();

  countries: Country[] = [];
  isClickCountry = false;
  isDisplayCountrySearch = false;

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
    this.closeSearchResult();
  }

  closeSearchResult(): void {
    this.isDisplayCountrySearch = false;
  }

  ngAfterViewInit(): void {
    fromEvent(window, 'keyup')
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          const country: string = this.form.get('country').value;

          if (this.countries.length && country.length) {
            this.isDisplayCountrySearch = true;

            return;
          }

          this.isDisplayCountrySearch = false;
        }),
        delay(200),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getValueChangesFromCountry(): void {
    this.form.get('country')
      .valueChanges
      .pipe(
        filter(country => country.trim()),
        concatMap(country => {
          return of(country)
            .pipe(
              delay(100),
              concatMap(_ => {
                return this.getCounty(country).pipe(
                  tap(countries => {
                    this.countries = countries;
                    this.messageFoundedCountry = countries.length ? '' : 'not found';
                  }),
                );
              })
            );
        })
      ).subscribe();
  }

  private getCounty(country: string): Observable<Country[]> {
    return this.countryApiService.getCountry(country);
  }
}
