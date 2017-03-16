import {
  Component, Input, OnInit, OnChanges, TemplateRef, ContentChildren, AfterViewInit,
  AfterContentInit, QueryList, ViewContainerRef, ComponentFactoryResolver, ComponentRef,
  Output, EventEmitter
} from '@angular/core';
import { DgTemplateDirective } from './templates';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractElement } from './mixins';

@Component({
  selector: 'action',
  template: 'Of course this template is fake!'
})
export class ActionComponent extends AbstractElement implements  AfterContentInit {

  @Output() public onAction = new EventEmitter();

  @Input() public confirm: string;

  @ContentChildren(DgTemplateDirective) public templates: QueryList<any>;

  public actionTemplate: TemplateRef<any>;

  constructor (
    private router: Router,
    protected route: ActivatedRoute
  ) { super(); }

  public onClick(item) {
    if (this.confirm) {
      if (confirm(this.confirm)) { // @ToDo use sexy modals and enable confirm eval
        this.doAction(item);
      }

      return;
    }

    this.doAction(item);
  }

  private doAction(item) {
    if(this.onAction.observers.length > 0) {
      return this.onAction.emit(item);
    }
    // @Todo make it more customizable
    this.router.navigate([this.route.snapshot.routeConfig.path, item.id, this.type ]);
  }
}
