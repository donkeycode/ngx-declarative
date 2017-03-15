# Configuration for columns

## Options on column

```` html
<column
    <!-- define api association on column -->
    mapped-on="string"
    <!-- define if column is sortable can be setted by default by dataProvider and else setted at true -->
    sortable="boolean:true"
    <!-- define if column is filterable can be setted by default by dataProvider and else setted at true -->
    filterable="boolean:true"
    <!-- Usefull for date columns filtering if canHaveEmptyValues=true add empty checkbox filter -->
    can-have-empty-values="boolean:false"
    <!-- Is column visible by default -->
    visible="boolean:true"
    <!-- Override autocalculated translationKey based on mapped-on -->
    translation-key="string"
    <!-- Define type of datas you manage to define data templates -->
    type="string:'default'"
></column>
````

## Override template for one specific column

By default template is defined by `type` option and matched with the [template configuration](templating.md),
but sometimes you want to override one template for one column

```` html
<column mapped-on="something">
    <template
    dg-template="header|footer|filter"
    let-column="element"
    let-item="item">
        Do something you want here
    </template>
</column>
````
