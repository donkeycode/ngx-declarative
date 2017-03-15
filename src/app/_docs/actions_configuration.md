# Configuration for actions

## Options on actions

```` html
<action
    <!-- define action on action -->
    type="string"
    <!-- define the type of the actions -->
    confirm="string"
    <!-- define the confirm text message -->
    (onAction)="function"
    <!-- define the callback function when click -->
></action>
````

## Override template for one specific action

By default template is defined by `type` option and matched with the [template configuration](templating.md),
but sometimes you want to override one template for one action

```` html
<action type="type">
    <template
    dg-template="action"
    let-item="item">
        Do something you want here
    </template>
</action>
````
