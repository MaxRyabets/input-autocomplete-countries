import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {Country} from './country.interface';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent {

  form = this.formBuilder.group({
    country: ['', []],
  });

  terms$: Observable<Country[]>;

  constructor(private formBuilder: FormBuilder) { }

}
