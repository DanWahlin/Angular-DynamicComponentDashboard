import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { COMPILER_PROVIDERS } from '@angular/compiler';

import { AppComponent }   from './app.component';
import { DashboardManagerModule }    from './dashboard-manager-jit/dashboard-manager.module';

@NgModule({
  imports:[ 
    BrowserModule,
    DashboardManagerModule
  ],
  declarations: [ AppComponent ],
  providers: [ COMPILER_PROVIDERS ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }