import { Component, Input, Inject, forwardRef } from '@angular/core';
import { ColumnComponent, ActionComponent, RestListConnectable } from '../core';
import { DataGridComponent } from './data-grid.component';

@Component({
    selector: '[table-row]',
    templateUrl: './rows.component.html'
})
export class RowsComponent {

    @Input() public columns: ColumnComponent[];

    @Input() public actions: ActionComponent[];

    // @Input() public parent: RestListConnectable;
    @Input() public item;
    constructor(@Inject(forwardRef(() => DataGridComponent)) public datagrid: DataGridComponent) {}

}
