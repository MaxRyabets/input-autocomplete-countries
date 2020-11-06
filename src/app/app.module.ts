import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InputCountrySearchComponent } from './country-search/input-search-country/input-country-search.component';
import { CountrySearchComponent } from './country-search/country-search.component';
import {CoreModule} from './core/core.module';
import { HighlightedCountryDirective } from './country-search/highlighted-country.directive';

@NgModule({
  declarations: [
    AppComponent,
    InputCountrySearchComponent,
    CountrySearchComponent,
    HighlightedCountryDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
