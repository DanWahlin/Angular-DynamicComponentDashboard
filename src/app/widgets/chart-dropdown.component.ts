import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';

import { IData } from './interfaces';

@Component({
    selector: 'chart-dropdown',
    template: `
        <div>
            <span [innerText]="optionsText" class="option-text"></span>
            <select (change)="changed($event.target.value)">
                <option value="">Select One:</option>
                <option *ngFor="let option of data.options" value="{{ option.key }}">
                    {{ option.value }}
                </option>
            </select>
            <p-chart *ngIf="data.results" [type]="type" [data]="data.results"></p-chart>
        </div>
    `
})
export class ChartDropdownComponent {
    @Input() type: string;
    @Input() dataUrl: string;
    @Input() optionsText: string;
    @Input() position: number;
    data: IData = {
        options: [],
        results: null
    };

    constructor() {

    }

    ngOnInit() {
        //Load default option results or results user had saved via Http
        this.data.options = [
            { key: '0', value: 'Option 1'},
            { key: '1', value: 'Option 2'},
            { key: '2', value: 'Option 3'}
        ];
        let val = this.getRandomNumber();
        this.renderChart(val);
    }

    changed(val: number) {
        //Call dataUrl and build up post data to send to server
        //When response comes back update the data property
        this.renderChart(val);
    }

    getRandomNumber() {
        let min = Math.ceil(0);
        let max = Math.floor(this.datasets.length);
        let val = Math.floor(Math.random() * (max - min)) + min;
        return val;
    }

    renderChart(val: number) {
        this.data.results = this.datasets[val];
    }

    datasets = [ 
            {
                labels: ['A','B','C'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }]    
            },
            {
                datasets: [{
                    data: [
                        11,
                        16,
                        7,
                        3,
                        14
                    ],
                    backgroundColor: [
                        "#FF6384",
                        "#4BC0C0",
                        "#FFCE56",
                        "#E7E9ED",
                        "#36A2EB"
                    ],
                    label: 'My dataset'
                }],
                labels: [
                    "Red",
                    "Green",
                    "Yellow",
                    "Grey",
                    "Blue"
                ]
            },
            {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: 'My Second dataset',
                        backgroundColor: '#9CCC65',
                        borderColor: '#7CB342',
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            }
        ];
}