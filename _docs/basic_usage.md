# Basic Usage
[Documentation](index.md)

```` ts
import { DataGridModule } from 'ngx-declarative/datagrid';

@NgModule({
  imports: [DataGridModule,...]
})
export class AppModule(){}
````

Declare your api

```` ts
import { Configurator } from 'ngx-declarative/configurator';

Configurator.setConfig({
    // Your api url
    apiUrl: 'http://localhost:3000'
});
````

In your page connect your grid to

```` html
<data-grid objects="books">
    <column mapped-on="title"></column>
</data-grid>
````

That's all !
