import { Component, ComponentRef, ViewChild, ViewContainerRef,
         AfterViewInit, OnInit, OnDestroy, OnChanges, 
         ComponentFactory, ElementRef} from '@angular/core';

import { IData } from './interfaces';
import { DashboardComponentService } from './dashboard-component.service';
import { TemplateBuilderService } from './template-builder.service';
import { ScriptLoaderService, ScriptModel } from '../core/script-loader.service';

declare var Packery: any;
declare var Draggabilly: any;

@Component({
  selector: 'dashboard-manager',
  template: `
    <div>
        <div #dynamicContentPlaceHolder></div> 
    </div>
  `,
})
export class DashboardManagerComponent implements OnInit, AfterViewInit, OnDestroy
{ 
    @ViewChild('dynamicContentPlaceHolder', {read: ViewContainerRef}) 
    dynamicComponentTarget: ViewContainerRef;

    componentRef: ComponentRef<IData>;
    isViewInitialized = false;

    constructor(private componentService: DashboardComponentService, 
                private templateBuilder: TemplateBuilderService,
                private scriptLoaderService: ScriptLoaderService) { }

    ngOnInit() { }

    ngAfterViewInit()
    {
        this.isViewInitialized = true; 
        this.loadScripts();
        this.renderComponents();
    }

    ngOnDestroy(){
        this.destroy();
    }  
    
    renderComponents() {
      
      this.destroy();
      
      this.templateBuilder.getTemplate().subscribe((template: string) => {
        this.componentService
            .createComponentFactory(template)
            .then((factory: ComponentFactory<IData>) =>
                {
                    this.componentRef = this.dynamicComponentTarget.createComponent(factory);
                    //this.componentRef.instance.data = this.data;
                });
      });
    }

    loadScripts() {
        this.scriptLoaderService.load([
            { name: 'packery', src: 'https://unpkg.com/packery@2/dist/packery.pkgd.min.js' },
            { name: 'draggabilly', src: 'https://unpkg.com/draggabilly@2/dist/draggabilly.pkgd.min.js'},
        ]).subscribe(() => {
            this.createLayout();
        });
    }

    createLayout() {
        var pckry = new Packery(document.getElementById('dashboardGrid'), {
            itemSelector: '.grid-item',
            gutter: 10
        });

        pckry.getItemElements().forEach((itemElem: HTMLElement) => {
            var draggie = new Draggabilly(itemElem);
            pckry.bindDraggabillyEvents( draggie );
        });

        function orderItems() { }

        pckry.on( 'layoutComplete', orderItems );
        pckry.on( 'dragItemPositioned', orderItems );
    }

    destroy() {
      if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = null;
      }
    }
  
}



