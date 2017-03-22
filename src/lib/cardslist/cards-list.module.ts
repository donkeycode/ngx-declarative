import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPILER_PROVIDERS } from '@angular/compiler';
import { CardsListComponent } from './cards-list.component';
import { CardComponent } from './card.component';
import { CoreModule } from '../core';

let components = [
    CardsListComponent,
    CardComponent
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
export class CardsListModule { }
