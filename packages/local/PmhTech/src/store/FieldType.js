Ext.define('PmhTech.store.FieldType', {
    extend: 'Ext.data.ArrayStore',
    storeId: 'FieldType',
    // reader configs
    fields: [
        {name: 'REF1', type: 'string'},
        {name: 'CODE', type: 'string'},
        {name: 'CODE_NM', type: 'string'}
    ], data: [
        ['10','combo', 'ComboBox'],
        ['20','textfield', 'Textfield'],
        ['30','datefield', 'DateField']
    ]
});