import { Component, Input, OnInit } from '@angular/core';

import { WidgetBaseComponent } from './widget-base.component';
import { DataService } from './data.service';

@Component({
    moduleId: module.id,
    selector: 'key-value',
    template: `
        <div *ngIf="data">
            <div *ngFor="let keyVal of data">
                <div class="text-center">
                    <h2>{{ keyVal.key }}</h2>
                    <br />
                    <h1 class="widget-large-value">{{ keyVal.value }}</h1>
                </div>
            </div>
        </div>
    `
})
export class KeyValueComponent extends WidgetBaseComponent implements OnInit {

    constructor(private dataService: DataService) { 
        super();
    }

    ngOnInit() { 
        this.dataService.getData(this.dataUrl)
            .subscribe((data: any) => {
                this.data = data;
            });
    }

}