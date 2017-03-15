import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[dg-template]'
})
export class DgTemplateDirective {
    @Input('dg-template') public name: string;

    constructor(public template: TemplateRef<any>) {}

    public getType(): string {
        return this.name;
    }
}
