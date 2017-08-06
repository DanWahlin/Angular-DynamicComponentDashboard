import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

import { IData } from './interfaces';
import { WidgetBaseComponent } from './widget-base.component';
import { EventBusService, EmitEvent, Events } from '../core/eventbus.service';
import { DataService } from './data.service';

@Component({
    selector: 'chart-dropdown',
    template: `
        <div *ngIf="data">
            <span [innerText]="optionsText" class="option-text"></span>
            <select (change)="changed($event.target.value)">
                <option value="">Select One:</option>
                <option *ngFor="let option of data.options" value="{{ option.key }}">
                    {{ option.value }}
                </option>
            </select>
            <p-chart [type]="type" [data]="data.results"></p-chart>
        </div>
    `
})
export class ChartDropdownComponent extends WidgetBaseComponent implements OnInit {
    @Input() type: string;
    @Input() optionsText: string;

    constructor(public dataService: DataService, public eventbus: EventBusService) { 
        super();
     }

    ngOnInit() {
        if (!this.data && this.dataUrl) {
            this.dataService.getData(this.dataUrl)
                .subscribe((chartData: any) => {
                    this.data = chartData;
                });
        }
    }

    changed(val: number) {
        //Call dataUrl and build up post data to send to server for saving settings
        let changeData = {
            username: '',
            widgetId: 1,
            optionValue: 2
        };

        this.dataService.saveSettings(changeData).subscribe((status: boolean) => {

        });

        //Use val to call server and grab fresh data
        
    }
}