import { Component, Inject, forwardRef, Input } from '@angular/core';
import { DataGridComponent } from './data-grid.component';
import { ColumnComponent } from '../core';

@Component({
    selector: '[headers]',
    templateUrl: './headers.component.html'
})
export class HeadersComponent {

  /* tslint:disable no-input-rename */
  @Input('headers') public columns: ColumnComponent[];
  @Input() public hasAction: boolean;

  /* tslint:disable no-forward-ref */
  constructor(@Inject(forwardRef(() => DataGridComponent)) public datagrid: DataGridComponent) {}
}
