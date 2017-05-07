import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'chart',
    template: `
        <div>
            <p-chart *ngIf="data" [type]="type" [data]="data"></p-chart>
        </div>
    `
})
export class ChartComponent {
    @Input() type: string;
    @Input() dataUrl: string;
    data: any;

    constructor() {

    }

    ngOnInit() {
        let val = this.getRandomNumber();
        this.renderChart(val);
    }

    getRandomNumber() {
        let min = Math.ceil(0);
        let max = Math.floor(this.datasets.length);
        let val = Math.floor(Math.random() * (max - min)) + min;
        console.log(val);
        return val;
    }

    renderChart(val: number) {
        this.data = this.datasets[val];
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