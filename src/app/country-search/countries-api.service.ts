import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Country} from './country.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {debounceTime, map} from 'rxjs/operators';

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
    );
  }
}
