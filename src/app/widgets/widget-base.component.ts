import { Component, OnInit, Input } from '@angular/core';

import { EventBusService } from '../eventbus/eventbus.service';
import { DataService } from './data.service';

@Component({
    moduleId: module.id
})
export class WidgetBaseComponent implements OnInit {

    _data: any;

    @Input() dataUrl: string;
    @Input() position: number;

    @Input() get data(): any {
        return this._data;
    }

    set data(data: any) {
        //Handle case where data is passed directly to component as a URL encoded string
        //Decode it and convert into an object
        if (typeof(data) === 'string') {
            data = JSON.parse(decodeURIComponent(data));
        }
        this._data = data;
    }

    constructor() { }

    ngOnInit() {

    }

}