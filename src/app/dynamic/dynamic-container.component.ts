import { Component, ComponentRef, ViewChild, ViewContainerRef,
         AfterViewInit, OnInit, OnDestroy, OnChanges, 
         ComponentFactory} from '@angular/core';

import { IData, DynamicTypeBuilderService } from './dynamic-type-builder.service';
import { DynamicTemplateBuilderService } from './dynamic-template-builder.service';

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

    constructor(private typeBuilder: DynamicTypeBuilderService, private templateBuilder: DynamicTemplateBuilderService) { }

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
      
      var template = this.templateBuilder.getTemplate();

      // here we get Factory (just compiled or from cache)
      this.typeBuilder
          .createComponentFactory(template)
          .then((factory: ComponentFactory<IData>) =>
            {
                this.componentRef = this.dynamicComponentTarget.createComponent(factory);
                //this.componentRef.instance.data = this.data;
            });
    }

    destroy() {
      if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = null;
      }
    }
  
}



