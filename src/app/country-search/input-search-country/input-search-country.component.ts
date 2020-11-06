import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-input-search-country',
  templateUrl: './input-search-country.component.html',
  styleUrls: ['./input-search-country.component.scss']
})
export class InputSearchCountryComponent implements OnInit {
  @ViewChildren('list') list: QueryList<ElementRef>;
  @ViewChild('inputCountry') inputTerm: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
}
