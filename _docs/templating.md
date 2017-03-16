# Templating for datas

```` ts
import { Templating } from './datagrid/dynamics/templates.provider';

TemplatesProvider.set(columnType: string, part: string, code: string);
TemplatesProvider.get(columnType: string, part: string): Promise<string>;

// Examples

// Defaults templates

TemplatesProvider.set('default', 'headerTemplate', '{{ element.translationKey }}');
TemplatesProvider.set('default', 'bodyTemplate', '{{ item[element.mappedOn] }}');
TemplatesProvider.set('default', 'filterTemplate',
  `<input type="text" [name]="element.mappedOn"
  [ngModel]="" (ngModelChange)="parent.filter($event, element)"/>`);
TemplatesProvider.set('default', 'actionTemplate',
  `<a (click)="element.onClick(item)">{{ element.type }}</a>`);
TemplatesProvider.set('default', 'paginationTemplate', paginationTemplate);
TemplatesProvider.set('default', 'cardTemplate', 'Bonjour'); // @TODO


// Some others
TemplatesProvider.set('html', 'bodyTemplate', '<div [innerHTML]=item[element.mappedOn]></div>');

TemplatesProvider.set('boolean', 'filterTemplate',
  `<select [ngModel]="\'both\'" (ngModelChange)="parent.filter($event, element)" >
    <option value="true">On</option>
    <option value="false">Off</option>
    <option value="both" selected >on & off</option>
  </select>`);
TemplatesProvider.set('boolean', 'bodyTemplate', '{{ item[element.mappedOn]?"on":"off" }}');

TemplatesProvider.set('date', 'bodyTemplate', '{{ item[element.mappedOn] | date:\'shortDate\' }}');
TemplatesProvider.set('date', 'filterTemplate',
  `<input type="date" [name]="element.mappedOn"
  [ngModel]="" (ngModelChange)="parent.filter($event, element)"/>`);

TemplatesProvider.set('datetime', 'bodyTemplate', '{{ item[element.mappedOn] | date:\'short\' }}');
TemplatesProvider.set('datetime', 'filterTemplate',
  `<input type="datetime" [name]="element.mappedOn"
  [ngModel]="" (ngModelChange)="parent.filter($event, element)"/>`);

TemplatesProvider.set('number', 'filterTemplate',
`<input type="number" [name]="element.mappedOn"
[ngModel]="" (ngModelChange)="parent.filter($event, element)"/>`);
````
