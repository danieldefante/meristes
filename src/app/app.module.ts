import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
///test
import { HttpModule } from '@angular/http';
///test
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { NavbarModule } from './modules/navbar/navbar.module';
import { LoaderService } from './services/loaderService';
///test
import { DataService } from './data.service';
///test
// import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ///test
    HttpModule,
    ///test
    
    NavbarModule,
    AppRoutingModule,
    // SimpleNotificationsModule.forRoot()

    // MatInputModule,
    // MatButtonModule, 
    // MatCheckboxModule
  ],
  exports: [
    // MatInputModule,
    // MatButtonModule, 
    // MatCheckboxModule
  ],
  providers: [
    LoaderService,
    ///test
    DataService,
    ///test
    {
      provide: LOCALE_ID, useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
