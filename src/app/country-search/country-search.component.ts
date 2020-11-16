import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {Country} from './country.interface';
import {CountriesApiService} from './countries-api.service';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountrySearchComponent implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    country: [''],
  });

  destroy$ = new Subject();

  inputCountry = '';
  messageNotFoundCountry = '';

  countries: Country[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private countryApiService: CountriesApiService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getValueChangesFromCountry();
  }

  trackByFn(index, item): number {
    return item.id;
  }

  onClickCountry(country: string): void {
    this.form.controls.country.setValue(country);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getValueChangesFromCountry(): void {
    this.form.get('country')
      .valueChanges
      .pipe(
        takeUntil(this.destroy$),
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
          this.cdRef.detectChanges();
        }),
      ).subscribe();
  }

  private getCounty(country: string): Observable<Country[]> {
    return this.countryApiService.getCountry(country);
  }
}
