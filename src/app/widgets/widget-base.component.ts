import { Component, OnInit, Input } from '@angular/core';

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
        if (typeof(data) === 'string') {
            data = JSON.parse(decodeURIComponent(data));
        }
        this._data = data;
    }

    constructor() { }

    ngOnInit() {

    }

}