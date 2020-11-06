import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Country} from './country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesApiService {

  constructor() { }

  getCountries(country: string): Observable<Country[]> { }
}
