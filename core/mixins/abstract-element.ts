import { Input, AfterContentInit } from '@angular/core';
import { DgTemplateDirective } from '../templates';

export abstract class AbstractElement implements AfterContentInit {
    public templates;
    @Input() public type: string;

    public ngAfterContentInit():void {
      this.loadTemplates();
    }

    protected loadTemplates() {
        this.templates.forEach((dgTemplate: DgTemplateDirective) => {
          // @todo check type is valid
          this[dgTemplate.getType() + 'Template'] = dgTemplate.template;
        });
    }

}
