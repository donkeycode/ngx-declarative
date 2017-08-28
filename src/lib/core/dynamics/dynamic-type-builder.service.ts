// From http://plnkr.co/edit/wh4VJG?p=preview
import {
  Compiler, Component, ComponentFactory, NgModule, Input, Injectable, ContentChild, Injector, ReflectiveInjector, ModuleWithComponentFactories, ViewContainerRef
} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { JitCompilerFactory, COMPILER_PROVIDERS } from '@angular/compiler';
import { DynamicsModule } from '../dynamics/dynamics.module';
import { DgTemplateDirective } from '../templates';
import { RestListConnectable, AbstractElement } from '../mixins';

export interface IHaveDynamicData {
    element: AbstractElement;

    parent: RestListConnectable;

    item: any;
}

export function CustomComponent(annotation: any) {
  return function (target: any) {
    const metaData = new Component(annotation)
    Component(metaData)(target)
  }
}
export function CustomNgModule(annotation: any) {
  return function (target: any) {
    const metaData = new NgModule(annotation)
    NgModule(metaData)(target)
  }
}

@Injectable()
export class DynamicTypeBuilder {
  // this object is singleton - so we can use this as a cache
  private static _cacheOfFactories: {
    [templateKey: string]: ComponentFactory<IHaveDynamicData>
  } = {};

  private injector: Injector;
  protected compiler;

  // wee need Dynamic component builder
  constructor(injector: Injector) {
    this.injector = ReflectiveInjector.resolveAndCreate(COMPILER_PROVIDERS, injector);
    this.compiler = this.injector.get(Compiler);
    // this.compiler = new JitCompilerFactory([{useDebug: false, useJit: true}]).createCompiler();
  }

  public createComponentFactory(template): Promise<ComponentFactory<IHaveDynamicData>> {
    let factory = DynamicTypeBuilder._cacheOfFactories[template.template];

    if (factory) {
        // console.log("Module and Type are returned from cache")

        return new Promise((resolve) => {
            resolve(factory);
        });
    }

    // unknown template ... let's create a Type for it
    let type   = this.createNewComponent(template.template);
    let module = this.createComponentModule(type, template.diOptions);

    return new Promise((resolve) => {
        let moduleWithFactories = this.compiler
            .compileModuleAndAllComponentsAsync(module);

        // factory = moduleWithFactories.componentFactories.find((element) => {
        //     return element.componentType === type;
        // });
        moduleWithFactories.then((moduleWithFactories: ModuleWithComponentFactories<any>) => {
          let compFactory = moduleWithFactories.componentFactories.find(
            (x) => { return x.componentType === type; }
          );

          DynamicTypeBuilder._cacheOfFactories[template.template] = compFactory;

          resolve(compFactory);
        })
        .catch((error) => {
          console.log(error);
        });

        // DynamicTypeBuilder._cacheOfFactories[template.template] = factory;
        //
        // resolve(factory);

    });
  }

  protected createNewComponent(tmpl: string) {
    /* tslint:disable max-classes-per-file */
    @CustomComponent({
        selector: 'dynamic-component',
        template: tmpl,
    })
    class CustomDynamicComponent implements IHaveDynamicData {
      @Input() public element: AbstractElement;

      @Input() public parent: RestListConnectable;

      @Input() public item: any;
    }
    // a component for this particular template
    return CustomDynamicComponent;
  }

  protected createComponentModule(componentType: any, options: any = {}) {
    /* tslint:disable max-classes-per-file */
    @CustomNgModule({
      // imports: [
      //   DynamicsModule, // there are 'html-column text-column'...
      // ].concat(options.imports || []),
      imports: [
        CommonModule,
        FormsModule
      ],
      declarations: [
        componentType
      ],
    })
    class RuntimeComponentModule {
    }
    // a module for just this Type
    return RuntimeComponentModule;
  }
}
