import { Component, ComponentFactory, NgModule, Input, Injectable } from '@angular/core';
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

        let type = this.createNewComponent(template);
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

    createNewComponent(template: string) {
        @Component({
            selector: 'dynamic-component',
            template: template,
        })
        class DynamicComponent implements IData {
            @Input() data: any;
            dragWidget: any;

            dragStart(event: any, dragId: string) {
                this.dragWidget = event.target.parentElement;
                console.log('dragId: ' + dragId);
            }

            drop(event: any, dropId: number) {
                let dropTarget = event.target.parentElement;
                let dropTargetParent = dropTarget.parentElement;
                let dragTargetParent = this.dragWidget.parentElement;

                dragTargetParent.removeChild(this.dragWidget);
                dropTargetParent.removeChild(dropTarget);
                dragTargetParent.appendChild(dropTarget);
                dropTargetParent.appendChild(this.dragWidget);
                console.log('dropId: ' + dropId);
            }

            dragEnd(event: any, dragId: number) {
                this.dragWidget = null;
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