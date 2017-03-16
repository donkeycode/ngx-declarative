import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataGridComponent } from './data-grid.component';
import { HeadersComponent } from './headers.component';
import { RowsComponent } from './rows.component';
import { FiltersComponent } from './filters.component';

import { CoreModule } from '../core';

import { COMPILER_PROVIDERS } from '@angular/compiler';

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
    ],
    providers: [
        COMPILER_PROVIDERS // this is an app singleton declaration
    ]
})
export class DataGridModule { }
