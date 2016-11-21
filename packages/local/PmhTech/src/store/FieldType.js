Ext.define('PmhTech.store.FieldType', {
    extend: 'Ext.data.ArrayStore',
    storeId: 'FieldType',
    // reader configs
    fields: [
        {name: 'CODE', type: 'string'},
        {name: 'CODE_NM', type: 'string'}
    ], data: [
        ['combo', 'ComboBox'],
        ['textfield', 'Textfield'],
        ['datefield', 'DateField']
    ]
});