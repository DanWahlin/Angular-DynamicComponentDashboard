import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { WidgetsModule }   from '../widgets/widgets.module';
import { DashboardManagerComponent }     from './dashboard-manager.component';
import { DashboardComponentService }     from './dashboard-component.service';
import { TemplateBuilderService } from './template-builder.service';

@NgModule({
  imports:      [ WidgetsModule, HttpModule ],
  declarations: [ DashboardManagerComponent ],
  exports:      [ DashboardManagerComponent ],
  providers:    [ TemplateBuilderService, DashboardComponentService ]
})

export class DashboardManagerModule {

}