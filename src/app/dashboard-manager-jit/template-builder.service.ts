import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TemplateBuilderService {

  url = '/data/widgets.json';

  constructor(private http: Http) { }

  public getTemplate(): Observable<string> {

    return this.http.get(this.url).map((res: Response) => {
      
      let widgets = res.json();

      let html = `<div class="container">
                      <div class="row">`;
      for (let widget of widgets) {
        html += `
                <div class="col-sm-1 col-md-6 col-lg-6 widget-container">
                    <div id="widget_${widget.id}" 
                        class="widget fade-in" 
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

    });
  }
}