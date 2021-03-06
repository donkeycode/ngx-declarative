import {
  Component, AfterContentInit, ContentChildren, QueryList, ChangeDetectorRef,
  OnInit, Input, EventEmitter, Output
} from '@angular/core';
import { ColumnComponent, ActionComponent, GET_LIST, RestListConnectable } from '../core';
import { Configurator } from '../configurator';

/* tslint:disable no-access-missing-member */
@Component({
  selector: 'data-grid',
  styleUrls: [ './data-grid.component.scss' ],
  templateUrl: './data-grid.component.html'
})
export class DataGridComponent extends RestListConnectable implements AfterContentInit {

  @ContentChildren(ColumnComponent) public cols: QueryList<ColumnComponent>;

  @ContentChildren(ActionComponent) public acts: QueryList<ActionComponent>;
  @Input() public trackByOption: string = 'id';
  @Input() public datagridClass: any;

  @Input() public trackByFn;
  @Output() public clickOnRow = new EventEmitter();

  public paginationPosition: string;
  public columns;
  public actions;

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
    let trackByOption = this.trackByOption;
    if (!this.trackByFn) {
      /* tslint:disable */
      this.trackByFn = function trackByFn(index, item) {
        if (item && item[trackByOption]) {
          return item[trackByOption];
        }
        return index;
      };
      /* tslint:enable */

    }
    this.columns = this.cols.toArray();
    this.columnsSubscription = this.cols.changes.subscribe(() => {
      this.initColumns();
      this.changeDetector.markForCheck();
    });
  }
  public emitClickOnTr(item) {
    this.clickOnRow.emit(item);
  }
  public initActions() {
    this.actions = this.acts.toArray();

    this.actionsSubscription = this.acts.changes.subscribe(() => {
      this.initActions();
      this.changeDetector.markForCheck();
    });
  }
}
