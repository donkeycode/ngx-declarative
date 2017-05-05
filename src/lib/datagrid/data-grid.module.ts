import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataGridComponent } from './data-grid.component';
import { HeadersComponent } from './headers.component';
import { RowsComponent } from './rows.component';
import { FiltersComponent } from './filters.component';

import { CoreModule } from '../core';

let components = [
    DataGridComponent,
    HeadersComponent,
    RowsComponent,
    FiltersComponent
];

@NgModule({
    exports: [...components, CoreModule],
    declarations: components,
    imports: [
        CommonModule,
        CoreModule
    ]
})
export class DataGridModule { }
