import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Country} from './country.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {debounceTime, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesApiService {

  constructor(private http: HttpClient) { }

  getCountries(country: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${environment.urlCountry}/${country}`).pipe(
      map((countries) =>
        countries.filter(({ name }) =>
          name.toLocaleLowerCase().startsWith(country.toLocaleLowerCase()))),
      debounceTime(200),
    );
  }
}
