# Datagrid configuration

## In global configuration

```` ts
import { Configurator } from './cardList/configurator';

Configurator.setConfig({
    // Your api url
    apiUrl: 'string',
    // restProvider class not instance
    restProvider: SimpleRestProvider
});
````

## In component

```` html
<cards-list
    <!-- the sub api part REQUIRED -->
    objects="string"
    <!-- the api url if empty fallback to global configuration, not used with source option  -->
    api-url="string"
    <!-- the dataProvider instance if empty fallback to global configuration by default SimpleRestProvider -->
    source="object"
>
  <card  type="default">
    <!-- type is the template for the card -->

    <!-- or if you want to use custom template for one card -->
    <template
      dg-template="card"
      let-card="element"
      let-item="item">
        What you want to display in your card here
    </template>
  </card>
</cards-list>
````
