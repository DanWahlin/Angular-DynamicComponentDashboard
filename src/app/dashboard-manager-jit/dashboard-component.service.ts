import { Component, ComponentFactory, NgModule, Input, Injectable, ElementRef } from '@angular/core';
import { JitCompiler } from '@angular/compiler';

import { IData } from './interfaces';
import { WidgetsModule } from '../widgets/widgets.module';

@Injectable()
export class DashboardComponentService {

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
        class DashboardComponent implements IData {
            @Input() data: any;
            dragTargetId: string;
            dragTarget: HTMLElement;
            dropTarget: HTMLElement;

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
                this.dropTarget = this.elementRef.nativeElement.querySelector('[id="widget_' + dropId + '"]');
                let dropTargetWidget = this.dropTarget.querySelector('[position]');
                let dropTargetWidgetPosition = dropTargetWidget.getAttribute('position');

                let dragTargetWidget = this.dragTarget.querySelector('[position]');
                let dragTargetWidgetPosition = dragTargetWidget.getAttribute('position');

                let dropTargetParent = this.dropTarget.parentElement;
                let dragTargetParent = this.dragTarget.parentElement;

                //Swap positions
                let dragOffset = dragTargetParent.offsetLeft;
                let dropOffset = dropTargetParent.offsetLeft;

                dragTargetParent.removeChild(this.dragTarget);
                dropTargetParent.removeChild(this.dropTarget);
                dragTargetParent.appendChild(this.dropTarget);
                dropTargetParent.appendChild(this.dragTarget);
                dropTargetWidget.setAttribute('position', dragTargetWidgetPosition);
                dragTargetWidget.setAttribute('position', dropTargetWidgetPosition);

            }

            dragEnd(event: any, dragId: string) {
                this.dragTarget.classList.remove('widget-drag-background');
                this.dragTarget = null;
                this.dropTarget = null;
            }
        };

        return DashboardComponent;
    }

    createComponentModule(componentType: any) {
        @NgModule({
            imports: [WidgetsModule],
            declarations: [componentType],
        })
        class DynamicComponentModule { }

        return DynamicComponentModule;
    }

}