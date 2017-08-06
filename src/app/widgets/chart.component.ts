import { Component, OnInit, Input } from '@angular/core';

import { WidgetBaseComponent } from './widget-base.component';
import { EventBusService } from '../core/eventbus.service';
import { DataService } from './data.service';

@Component({
    selector: 'chart',
    template: `
        <div *ngIf="data">
            <p-chart [type]="type" [data]="data"></p-chart>
        </div>
    `
})
export class ChartComponent extends WidgetBaseComponent implements OnInit {
    
    @Input() type: string;
    @Input() dataUrl: string;
    @Input() position: number;
    data: any;
    datasets: any[];

    constructor(public dataService: DataService, public eventbus: EventBusService) { 
        super();
    }

    ngOnInit() {
        if (!this.data && this.dataUrl) {
            this.dataService.getData(this.dataUrl)
                .subscribe((chartData: any) => {
                    this.datasets = chartData;
                    let val = this.getRandomNumber();
                    this.renderChart(val);
                });
        }
    }

    getRandomNumber() {
        let min = Math.ceil(0);
        let max = Math.floor(this.datasets.length);
        let val = Math.floor(Math.random() * (max - min)) + min;
        return val;
    }

    renderChart(val: number) {
        this.data = this.datasets[val];
    }
}