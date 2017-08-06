
import { NgModule, forwardRef }   from '@angular/core';
import { CommonModule }  from "@angular/common";
import { FormsModule }   from "@angular/forms";
import { HttpModule }   from "@angular/http";

import { ChartModule }  from 'primeng/components/chart/chart';
import { ChartComponent } from './chart.component';
import { ChartDropdownComponent } from './chart-dropdown.component';
import { KeyValueComponent } from './key-value.component';
import { DataService } from './data.service';

@NgModule({
  imports: [ 
      CommonModule,
      FormsModule,
      HttpModule,
      ChartModule
  ],
  declarations: [ ChartComponent, ChartDropdownComponent, KeyValueComponent ],
  exports: [
      CommonModule,
      ChartComponent,
      ChartDropdownComponent,
      KeyValueComponent,
      FormsModule
  ],
  providers: [ DataService ]
})
export class WidgetsModule {

}