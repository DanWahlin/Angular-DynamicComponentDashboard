import { Component, Input, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'key-value',
    template: `
        <div>
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
export class KeyValueComponent implements OnInit {
    @Input() dataUrl: string;
    data: any = [{ key: "166 Expenses", value: 15674 }];
    @Input() position: number;

    constructor() { }

    ngOnInit() { 

    }

}