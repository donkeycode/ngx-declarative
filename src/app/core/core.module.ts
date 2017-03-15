import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColumnComponent } from './column.component';
import { ActionComponent } from './action.component';

import { DgTemplateDirective, TemplateLoaderDirective } from './templates';

import { DynamicsModule }    from './dynamics';
import { COMPILER_PROVIDERS } from '@angular/compiler';

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
    ],
    providers: [
        COMPILER_PROVIDERS // this is an app singleton declaration
    ]
})
export class CoreModule { }
