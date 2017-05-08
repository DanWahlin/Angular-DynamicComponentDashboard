import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

import { IData } from './interfaces';
import { DataService } from './data.service';
import { WidgetBaseComponent } from './widget-base.component';

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

    constructor(private dataService: DataService) { 
        super();
     }

    ngOnInit() {
        this.dataService.getData(this.dataUrl)
            .subscribe((chartData: any) => {
                this.data = chartData;
            });
    }

    changed(val: number) {
        //Call dataUrl and build up post data to send to server
        //When response comes back update the data property

    }
}