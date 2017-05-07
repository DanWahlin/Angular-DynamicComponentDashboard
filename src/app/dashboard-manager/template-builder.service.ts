import {Injectable} from "@angular/core";

@Injectable()
export class TemplateBuilderService {

    public getTemplate(){
    
      let widgets = [
        { 
          "id": 1,
          "headerText": "Productivity",
          "description": "....",
          "tagName": "chart-dropdown",
          "properties": [
            { "name": "optionsText", "value": "Cost Center" },
            { "name": "dataUrl", "value": "http://somesite/api" },
            { "name": "type", "value": "doughnut" }
          ]
        },
        { 
          "id": 3,
          "headerText": "Something",
          "description": "....",
          "tagName": "chart",
          "properties": [
            { "name": "dataUrl", "value": "http://somesite/api" },
            { "name": "type", "value": "line" }
          ]
        },
        { 
          "id": 4,
          "headerText": "HR Staff",
          "description": "....",
          "tagName": "chart",
          "properties": [
            { "name": "dataUrl", "value": "http://somesite/api" },
            { "name": "type", "value": "line" }
          ]
        },
        { 
          "id": 2,
          "headerText": "Cost Center",
          "description": "....",
          "tagName": "key-value",
          "properties": [
            { "name": "dataUrl", "value": "http://somesite/api" }
          ]
        },
      ];

      let html = `<div class="container">
                    <div class="row">`;
      for (let widget of widgets) {
        html += `
              <div class="col-sm-1 col-md-6 col-lg-6 widget-container">
                  <div id="widget_${widget.id}" class="widget" 
                       (onDrop)="drop($event, ${widget.id})" 
                       (onDragStart)="dragStart($event, ${widget.id})" 
                       pDraggable="widget" pDroppable="widget">
                    <div class="widget-header" title="${widget.description}">${widget.headerText}</div>
                      <${widget.tagName} `;
        
        //generate attributes for tag
        for (let prop of widget.properties) {
          html += prop.name + '="' + prop.value + '"';
        }

        html += ` ></${widget.tagName}>
                  </div>
              </div>
        `;
      }

      html += `
          </div>
        </div>
      `;

      return html;
/*
      return `
        <div class="container">
            <div class="row">
              <div class="col-sm-6 col-md-4 col-lg-3 widget-container">
                  <div class="widget">
                    <div class="widget-header">Header</div>
                    <chart type="doughnut"></chart>
                  </div>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-3 widget-container">
                  <div class="widget">
                    <div class="widget-header">Header</div>
                      <chart type="line"></chart>
                  </div>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-3 widget-container">
                <chart type="polarArea"></chart>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-3 widget-container">
                <chart type="pie"></chart>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-3 widget-container">
                <chart type="bar"></chart>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-3 widget-container">
                <key-value></key-value>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-3 widget-container">
                <key-value></key-value>
              </div>
              <div class="col-sm-6 col-md-4 col-lg-3 widget-container">
                <key-value></key-value>
              </div>
            </div>
        </div>
      `;
      */
    }
}