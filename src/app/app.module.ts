import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { InputSearchCountryComponent } from './country-search/input-search-country/input-search-country.component';
import { CountrySearchComponent } from './country-search/country-search.component';

@NgModule({
  declarations: [
    AppComponent,
    InputSearchCountryComponent,
    CountrySearchComponent
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
