import {
  Component, Input, OnInit, OnChanges, TemplateRef, ContentChildren, AfterViewInit,
  AfterContentInit, QueryList, ViewContainerRef, ComponentFactoryResolver, ComponentRef
} from '@angular/core';
import { DgTemplateDirective } from './templates';
import { AbstractElement } from './mixins';

@Component({
  selector: 'column',
  template: 'Of course this template is fake!'
})
export class ColumnComponent extends AbstractElement implements OnInit,  AfterContentInit {
  @Input('mapped-on') public mappedOn: string;

  @Input() public sortable: boolean = true;

  @Input() public filterable: boolean = true;

  // Usefull for date columns filtering if canHaveEmptyValues=true add empty checkbox filter
  @Input('can-have-empty-values') public canHaveEmptyValues: boolean = false;

  @Input() public visible: boolean = true;

  @Input('translation-key') public translationKey: string;

  @ContentChildren(DgTemplateDirective) public templates: QueryList<any>;

  public headerTemplate: TemplateRef<any>;
  public bodyTemplate: TemplateRef<any>;

  public ngOnInit() {
    if (!this.translationKey) {
      this.translationKey = this.mappedOn;
    }
  }

}
