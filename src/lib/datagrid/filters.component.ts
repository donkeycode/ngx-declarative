import { Component, Inject, forwardRef, Input } from '@angular/core';
import { DataGridComponent } from './data-grid.component';
import { ColumnComponent } from '../core';

@Component({
    selector: '[filters]',
    templateUrl: './filters.component.html'
})
export class FiltersComponent {

  /* tslint:disable no-input-rename */
  @Input('filters') public columns: ColumnComponent[];
  @Input() public hasAction: boolean;

  /* tslint:disable no-forward-ref */
  constructor(@Inject(forwardRef(() => DataGridComponent)) public datagrid: DataGridComponent) {}
}
