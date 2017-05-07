import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { COMPILER_PROVIDERS } from '@angular/compiler';

import { AppComponent }   from './app.component';
import { DynamicModule }    from './dynamic/dynamic.module';

@NgModule({
  imports:[ 
    BrowserModule,
    DynamicModule
  ],
  declarations: [ AppComponent ],
  providers: [ COMPILER_PROVIDERS ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }