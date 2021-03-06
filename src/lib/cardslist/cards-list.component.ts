import {
  Component, AfterContentInit, ContentChild, ContentChildren, QueryList,
  ChangeDetectorRef, OnInit, Input
} from '@angular/core';

import {
  ColumnComponent, ActionComponent, GET_LIST, RestListConnectable, AbstractElement
} from '../core';
import { CardComponent } from './card.component';

@Component({
  selector: 'cards-list',
  styleUrls: [ './cards-list.component.scss' ],
  templateUrl: './cards-list.component.html'
})
export class CardsListComponent extends RestListConnectable  {

    public template = `<div>
    <p>Dynamic Component + {{item | json}}</p>
    <div *componentOutlet="'lol'; context: self; selector:'test2'"></div>
  </div>`;

    @ContentChildren(ColumnComponent) public cols: QueryList<ColumnComponent>;

    @ContentChildren(ActionComponent) public acts: QueryList<ActionComponent>;

    @ContentChild(CardComponent) public card: CardComponent;

    @Input() public trackByOption: string = 'id';

    public trackByFn;

    constructor(public changeDetector: ChangeDetectorRef) {
      super(changeDetector);
    }

    public onColumnDragStart = () => undefined;
    public onColumnDragover = () => undefined;
    public onColumnDragleave = () => undefined;
    public onColumnDrop = () => undefined;
    public onFilerMousedown = () => undefined;
    public onFilerKeydown = () => undefined;
    public onHeaderMousedown = () => undefined;
    public onHeaderKeydown = () => undefined;

    public initColumns() {
      this.columns = this.cols.toArray();

      this.columnsSubscription = this.cols.changes.subscribe(() => {
        this.initColumns();
        this.changeDetector.markForCheck();
      });
    }
    public initActions() {
      this.actions = this.acts.toArray();

      this.actionsSubscription = this.acts.changes.subscribe(() => {
        this.initActions();
        this.changeDetector.markForCheck();
      });
    }
}
