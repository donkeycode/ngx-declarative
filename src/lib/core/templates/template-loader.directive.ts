import {
  Directive, ComponentFactory, Input, EmbeddedViewRef, ViewContainerRef, OnInit,
  OnDestroy, ContentChild, TemplateRef, ComponentRef, SimpleChange, AfterViewInit
} from '@angular/core';
import { IHaveDynamicData, DynamicTypeBuilder } from '../dynamics';
import { TemplatesProvider } from './templates.provider';
import { RestListConnectable, AbstractElement } from '../mixins';

@Directive({
    selector: '[template-loader]'
})
export class TemplateLoaderDirective implements OnInit, OnDestroy, AfterViewInit {

    @Input() public type: string;

    @Input() public element: AbstractElement;

    @Input() public parent: RestListConnectable;

    @Input() public item: any;

    public view: EmbeddedViewRef<any>;

    protected componentRef: ComponentRef<IHaveDynamicData>;

    constructor(public viewContainer: ViewContainerRef,
                protected typeBuilder: DynamicTypeBuilder
    ) { }

    public ngOnInit() {
        if (this.element && this.element[this.type]) {
            this.view = this.viewContainer.createEmbeddedView(this.element[this.type], {
                element: this.element,
                item: this.item,
                parent: this.parent
            });
            return;
        }
    }

    // this is the best moment where to start to process dynamic stuff
    public ngAfterViewInit(): void {
        this.useDefaultTemplate();
    }

    public ngOnDestroy() {
        if (this.view) {
          this.view.destroy();
        }

        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

    protected useDefaultTemplate() {
        if (this.element && this.element[this.type]) {
            return;
        }
        if (this.componentRef) {
            this.componentRef.destroy();
        }

        // here we get a TEMPLATE with dynamic content === TODO
        return TemplatesProvider.get(this.element ? this.element.type : ' default', this.type)
          .then((template) => {
            // here we get Factory (just compiled or from cache)
            return this.typeBuilder
                .createComponentFactory(template)
                .then((factory: ComponentFactory<IHaveDynamicData>) => {
                // Target will instantiate and inject component (we'll keep reference to it)
                this.componentRef = this
                    .viewContainer
                    .createComponent(factory);

                // let's inject @Inputs to component instance
                let component: IHaveDynamicData = this.componentRef.instance;
                component.element = this.element;
                component.item = this.item;
                component.parent = this.parent;
                // ...

                return new Promise((res, rej) => {
                    res();
                });
            });
        }, (msg) => { throw msg; });
  }
}
