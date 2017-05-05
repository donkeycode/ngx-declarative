import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColumnComponent } from './column.component';
import { ActionComponent } from './action.component';

import { DgTemplateDirective, TemplateLoaderDirective } from './templates';

import { DynamicsModule }    from './dynamics';

let components = [
    ColumnComponent,
    ActionComponent,
    TemplateLoaderDirective,
    DgTemplateDirective
];

@NgModule({
    exports: components,
    declarations: components,
    imports: [
        CommonModule,
        DynamicsModule.forRoot() // singletons
    ]
})
export class CoreModule { }
