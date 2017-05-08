import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id
})
export class WidgetBaseComponent implements OnInit {
    
    @Input() dataUrl: string;
    @Input() data: any;
    @Input() position: number;

    constructor() { }

    ngOnInit() { 

    }

}