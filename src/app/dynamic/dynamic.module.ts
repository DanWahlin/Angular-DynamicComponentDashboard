import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WidgetsModule }   from '../widgets/widgets.module';
import { DashboardManagerComponent }     from './dynamic-container.component';
import { DynamicTypeBuilderService }     from './dynamic-type-builder.service';
import { DynamicTemplateBuilderService } from './dynamic-template-builder.service';

@NgModule({
  imports:      [ WidgetsModule ],
  declarations: [ DashboardManagerComponent ],
  exports:      [ DashboardManagerComponent ],
  providers:    [ DynamicTemplateBuilderService, DynamicTypeBuilderService ]
})

export class DynamicModule {

}