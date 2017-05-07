import { Component, ComponentFactory, NgModule, Input, Injectable, ElementRef } from '@angular/core';
import { JitCompiler } from '@angular/compiler';

import { PanelModule } from 'primeng/components/panel/panel';
import { WidgetsModule } from '../widgets/widgets.module';

export interface IData {
    data: any;
}

@Injectable()
export class ComponentBuilderService {

    constructor(private compiler: JitCompiler) { }

    private factoryCache: { [templateKey: string]: ComponentFactory<IData> } = {};

    createComponentFactory(template: string): Promise<ComponentFactory<IData>> {

        let factory = this.factoryCache[template];

        if (factory) {
            return new Promise((resolve) => {
                resolve(factory);
            });
        }

        let type = this.createComponent(template);
        let module = this.createComponentModule(type);

        return new Promise((resolve) => {
            this.compiler
                .compileModuleAndAllComponentsAsync(module)
                .then((moduleWithFactories) => {
                    for (let f of moduleWithFactories.componentFactories) {
                        if (f.componentType === type) {
                            factory = f;
                        }
                    }

                    this.factoryCache[template] = factory;
                    resolve(factory);
                });
        });
    }

    createComponent(template: string) {
        @Component({
            selector: 'dynamic-component',
            template: template,
        })
        class DynamicComponent implements IData {
            @Input() data: any;
            dragTargetId: string;
            dragTarget: any;

            constructor(private elementRef: ElementRef) { }

            dragStart(event: any, dragId: string) {
                //Easier to find target by ID vs. grabbing event target
                //since user may drag a child of the widget div
                this.dragTargetId = dragId;
                this.dragTarget = this.elementRef.nativeElement.querySelector('[id="widget_' + dragId + '"]');
                this.dragTarget.classList.add('widget-drag-background');
            }

            drop(event: any, dropId: string) {
                //If dropping onto self then exit function
                if (this.dragTargetId === dropId) return;

                //Easier to find target by ID vs. grabbing event target
                //since user may drag a child of the widget div
                let dropTarget = this.elementRef.nativeElement.querySelector('[id="widget_' + dropId + '"]');
                let dropTargetWidget = dropTarget.querySelector('[position]');
                let dropTargetWidgetPosition = dropTargetWidget.getAttribute('position');

                let dragTargetWidget = this.dragTarget.querySelector('[position]');
                let dragTargetWidgetPosition = dragTargetWidget.getAttribute('position');

                let dropTargetParent = dropTarget.parentElement;
                let dragTargetParent = this.dragTarget.parentElement;

                //Swap positions
                dragTargetParent.removeChild(this.dragTarget);
                dropTargetParent.removeChild(dropTarget);
                dragTargetParent.appendChild(dropTarget);
                dropTargetParent.appendChild(this.dragTarget);
                dropTargetWidget.setAttribute('position', dragTargetWidgetPosition);
                dragTargetWidget.setAttribute('position', dropTargetWidgetPosition);

            }

            dragEnd(event: any, dragId: string) {
                this.dragTarget.classList.remove('widget-drag-background');
                this.dragTarget = null;
            }
        };

        return DynamicComponent;
    }

    createComponentModule(componentType: any) {
        @NgModule({
            imports: [PanelModule, WidgetsModule],
            declarations: [componentType],
        })
        class DynamicComponentModule { }

        return DynamicComponentModule;
    }

}