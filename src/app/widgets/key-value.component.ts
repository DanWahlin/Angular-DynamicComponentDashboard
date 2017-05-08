import { Component, Input, OnInit } from '@angular/core';

import { WidgetBaseComponent } from './widget-base.component';
import { EventBusService } from '../eventbus/eventbus.service';
import { DataService } from './data.service';

@Component({
    moduleId: module.id,
    selector: 'key-value',
    template: `
        <div *ngIf="data" class="key-value-widget">
            <div class="row">
                <div class="col-md-4 text-center">
                    <span *ngIf="data.icon" [innerHTML]="data.icon"></span>
                    <img *ngIf="data.imageUrl" [src]="data.imageUrl" />
                </div>
                <div class="col-md-8 key-value-widget-content">
                    <div *ngFor="let keyVal of data.results">
                        <div class="">
                            <h2>{{ keyVal.key }}</h2>
                            <br />
                            <h2 class="widget-large-value">{{ keyVal.value }}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class KeyValueComponent extends WidgetBaseComponent implements OnInit {

    constructor(public dataService: DataService, public eventbus: EventBusService) { 
        super();
    }

    ngOnInit() { 
        if (!this.data && this.dataUrl) {
            this.dataService.getData(this.dataUrl)
                .subscribe((data: any) => {
                    this.data = data;
                });
        }

    }

}