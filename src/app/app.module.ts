import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import { InputCountrySearchComponent } from './country-search/input-search-country/input-country-search.component';
import { CountrySearchComponent } from './country-search/country-search.component';

@NgModule({
  declarations: [
    AppComponent,
    InputCountrySearchComponent,
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
