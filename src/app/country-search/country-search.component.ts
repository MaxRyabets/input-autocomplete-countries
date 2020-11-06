import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {Country} from './country.interface';
import {CountriesApiService} from './countries-api.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent implements OnInit {

  form = this.formBuilder.group({
    country: ['', []],
  });

  terms$: Observable<Country[]>;

  constructor(
    private formBuilder: FormBuilder,
    private countryApiService: CountriesApiService
    ) { }

  ngOnInit(): void {
    this.countryApiService.getCountries('g').pipe(
      tap(countries => {
        console.log(countries);
      })
    )
      .subscribe();
  }

}
