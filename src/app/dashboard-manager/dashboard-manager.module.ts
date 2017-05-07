import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WidgetsModule }   from '../widgets/widgets.module';
import { DashboardManagerComponent }     from './dashboard-manager.component';
import { ComponentBuilderService }     from './component-builder.service';
import { TemplateBuilderService } from './template-builder.service';

@NgModule({
  imports:      [ WidgetsModule ],
  declarations: [ DashboardManagerComponent ],
  exports:      [ DashboardManagerComponent ],
  providers:    [ TemplateBuilderService, ComponentBuilderService ]
})

export class DashboardManagerModule {

}