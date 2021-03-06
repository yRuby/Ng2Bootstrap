import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { AppState, Global } from '../services/app.service';
import { EmployeeService } from  '../services/employee.service'
import { UnitService } from  '../services/unit.service'
import { InMemoryWebApiModule } from  'angular-in-memory-web-api';
import { InMemoryDataService } from '../services/in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search.component';
import { UnitSearchComponent } from './components/unitsearch.component';
import { EmployeeComponent } from './pages/employee.component';
import { UnitComponent } from './pages/unit.component';
import { PageComponent } from './components/page.component';
import { DatePickerComponent } from './components/datepicker.component';

const APP_PROVIDERS = [
  AppState, Global,EmployeeService,UnitService
]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    EmployeeComponent,
    UnitComponent,
    PageComponent,
    DatePickerComponent,
    UnitSearchComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [ APP_PROVIDERS ],
  bootstrap: [AppComponent]
})
export class AppModule { }
