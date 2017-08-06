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

      // let html = `<div class="container">
      //                 <div class="row">`;
      let html = `
        <div class="grid" id="dashboardGrid">
      `;
      for (let widget of widgets) {
          html += `
              <div id="widget_${widget.id}" class="grid-item grid-item--width2">
                <div class="widget-header" title="${widget.description}">${widget.headerText}</div>
                  <${widget.componentName}
          `;

        //generate attributes for tag
        for (let prop of widget.properties) {
          html += prop.name + '="' + prop.value + '"';
        }

        html += `
            ></${widget.componentName}>
          </div>
        `;
      }

      html += `
          </div>
        `;

      return html;

    });
  }
}