import { Component, Input, Inject, ContentChildren, QueryList, forwardRef } from '@angular/core';
import { ColumnComponent, ActionComponent, RestListConnectable } from '../core';
import { CardsListComponent } from './cards-list.component';
import { DgTemplateDirective, AbstractElement } from '../core';

@Component({
    selector: 'card',
    template: 'Only dolphin can see this, are you a dolphin ?'
})
export class CardComponent extends AbstractElement {

    @ContentChildren(ActionComponent) public actions: QueryList<ActionComponent>;

    @ContentChildren(DgTemplateDirective) public templates: QueryList<any>;

    constructor(@Inject(forwardRef(() => CardsListComponent))
      public cardsList: CardsListComponent) {
      super();
    }

}
