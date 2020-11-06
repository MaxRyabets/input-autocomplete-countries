import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {Country} from '../country.interface';

@Component({
  selector: 'app-country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent implements OnInit {
  form: FormGroup;

  terms$: Observable<Country[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
