import { NgModule } from '@angular/core';

import { ScriptLoaderService } from './script-loader.service';
import { EventBusService } from './eventbus.service';

@NgModule({
    providers: [ ScriptLoaderService, EventBusService ]
})
export class CoreModule { }