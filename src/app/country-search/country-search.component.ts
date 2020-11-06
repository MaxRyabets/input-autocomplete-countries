import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Country} from './country.interface';
import {CountriesApiService} from './countries-api.service';
import {concatMap, delay, tap} from 'rxjs/operators';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent implements OnInit {
  private country = '';

  form = this.formBuilder.group({
    country: [''],
  });

  countries: Country[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private countryApiService: CountriesApiService
    ) { }

  ngOnInit(): void {
    this.getValueChangesFromCountry();
  }

  private getValueChangesFromCountry(): void {
    this.form.get('country')
      .valueChanges
      .pipe(
        concatMap(country => {
          return of(country)
            .pipe(
              delay(100),
              concatMap(_ => {
                return this.getCounty(country).pipe(
                  tap(countries => this.countries = countries),
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
