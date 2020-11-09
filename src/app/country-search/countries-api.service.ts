import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Country} from './country.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, debounceTime, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesApiService {

  constructor(private http: HttpClient) { }

  /** GET country from the server */
  getCountry(country: string): Observable<Country[]> {
    const url = `${environment.urlCountry}/${country}`;

    return this.http.get<Country[]>(url).pipe(
      map((countries) =>
        countries.filter(({ name }) => {
          return name.toLocaleLowerCase().startsWith(country.toLocaleLowerCase());
        })),
      debounceTime(200),
      catchError(this.handleError<Country[]>('getCountries', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(error.message);
      return of(result as T);
    };
  }
}
