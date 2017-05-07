import {Injectable} from "@angular/core";

@Injectable()
export class TemplateBuilderService {

    public getTemplate(){
    
      let widgets = [
        { 
          "id": 1,
          "headerText": "Productivity",
          "description": "....",
          "componentName": "chart-dropdown",
          "properties": [
            { "name": "optionsText", "value": "Cost Center" },
            { "name": "dataUrl", "value": "http://somesite/api" },
            { "name": "type", "value": "doughnut" },
            { "name": "position", "value": 1 }
          ]
        },
        { 
          "id": 3,
          "headerText": "Something",
          "description": "....",
          "componentName": "chart",
          "properties": [
            { "name": "dataUrl", "value": "http://somesite/api" },
            { "name": "type", "value": "line" },
            { "name": "position", "value": 2 }
          ]
        },
        { 
          "id": 4,
          "headerText": "HR Staff",
          "description": "....",
          "componentName": "chart",
          "properties": [
            { "name": "dataUrl", "value": "http://somesite/api" },
            { "name": "type", "value": "line" },
            { "name": "position", "value": 3 }
          ]
        },
        { 
          "id": 2,
          "headerText": "Cost Center",
          "description": "....",
          "componentName": "key-value",
          "properties": [
            { "name": "dataUrl", "value": "http://somesite/api" },
            { "name": "position", "value": 4 }
          ]
        },
      ];

      let html = `<div class="container">
                    <div class="row">`;
      for (let widget of widgets) {
        html += `
              <div class="col-sm-1 col-md-6 col-lg-6 widget-container">
                  <div id="widget_${widget.id}" 
                       class="widget" 
                       (onDrop)="drop($event, ${widget.id})" 
                       (onDragStart)="dragStart($event, ${widget.id})" 
                       (onDragEnd)="dragEnd($event, ${widget.id})"
                       pDraggable="widget" pDroppable="widget">
                    <div class="widget-header"  title="${widget.description}">${widget.headerText}</div>
                      <${widget.componentName} `;
        
        //generate attributes for tag
        for (let prop of widget.properties) {
          html += prop.name + '="' + prop.value + '"';
        }

        html += ` ></${widget.componentName}>
                  </div>
              </div>
        `;
      }

      html += `
          </div>
        </div>
      `;

      return html;
    }
}