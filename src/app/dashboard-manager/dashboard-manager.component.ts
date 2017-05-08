import { Component, ComponentRef, ViewChild, ViewContainerRef,
         AfterViewInit, OnInit, OnDestroy, OnChanges, 
         ComponentFactory} from '@angular/core';

import { IData } from './interfaces';
import { DashboardComponentService } from './dashboard-component.service';
import { TemplateBuilderService } from './template-builder.service';

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
                private templateBuilder: TemplateBuilderService) { }

    ngOnInit() { }

    ngAfterViewInit()
    {
        this.isViewInitialized = true; 
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

    destroy() {
      if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = null;
      }
    }
  
}



