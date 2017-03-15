# Connect your APIs

DataProviders are inspired from https://github.com/marmelab/admin-on-rest/blob/master/src/rest/

## Create your own

```` ts
/**
 * Maps admin-on-rest queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchJson) => {
    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return (type, resource, params) => {
    };
})
`````

## Use your own 

### In global configuration

```` ts
import { Configurator } from './datagrid/configurator';
import SimpleRestProvider from './datagrid/data-providers/simple';

Configurator.setConfig({
    // Your api url
    apiUrl: 'string',
    // restProvider class not instance
    restProvider: SimpleRestProvider
});
````

### In instance configuration

```` html
<data-grid
    [source]="SimpleRestProvider"
>
</data-grid>
````

