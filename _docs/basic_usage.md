# Basic Usage

Declare your api 

```` ts
import { Configurator } from './datagrid/configurator';

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

