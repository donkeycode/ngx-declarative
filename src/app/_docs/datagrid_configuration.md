# Datagrid configuration

## In global configuration

```` ts
import { Configurator } from './datagrid/configurator';

Configurator.setConfig({
    // Your api url
    apiUrl: 'string',
    // restProvider class not instance
    restProvider: SimpleRestProvider
});
````

## In component

```` html
<data-grid
    <!-- the sub api part REQUIRED -->
    objects="string"
    <!-- the api url if empty fallback to global configuration, not used with source option  -->
    api-url="string"
    <!-- the dataProvider instance if empty fallback to global configuration by default SimpleRestProvider -->
    source="object"
>
</data-grid>
````

