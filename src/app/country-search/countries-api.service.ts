import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Country} from './country.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesApiService {

  constructor(private http: HttpClient) { }

  getCountries(country: string): Observable<Country[]> {
    return of();
  }
}
