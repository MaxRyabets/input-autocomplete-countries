import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import {Country} from './country.interface';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChildren('list') list: QueryList<ElementRef>;
  @ViewChild('inputCity') inputTerm: ElementRef;
  form: FormGroup;


  terms$: Observable<Country[]>;
}
