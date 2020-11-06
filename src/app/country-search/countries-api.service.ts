import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Country} from './country.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, debounceTime, map} from 'rxjs/operators';

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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
