// make all parts as one DYNAMIC_DIRECTIVES
// import { forwardRef }   from '@angular/core';

export const DYNAMIC_DIRECTIVES = [
  // forwardRef(() => HtmlColumnComponent),
];

// module itself
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { DynamicTypeBuilder }     from '../dynamics/dynamic-type-builder.service';

@NgModule({
  imports:      [
      CommonModule,
      FormsModule
  ],
  declarations: [
      DYNAMIC_DIRECTIVES
  ],
  exports: [
      DYNAMIC_DIRECTIVES,
      CommonModule,
      FormsModule
  ]
})
export class DynamicsModule {

    public static forRoot() {
        return {
            ngModule: DynamicsModule,
            providers: [
              // singletons accross the whole app
              DynamicTypeBuilder
            ]
        };
    }
}
