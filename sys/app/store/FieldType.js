Ext.define('SysApp.store.FieldType', {
    extend: 'Ext.data.ArrayStore',
    storeId: 'FieldType',
    fields: [
        {name: 'REF1', type: 'string'},
        {name: 'CODE', type: 'string'},
        {name: 'CODE_NM', type: 'string'}
    ], data: [
        ['10','textfield', 'Textfield'],
        ['20','pmh-combo-code', 'ComboBox'],
        ['30','datefield', 'DateField']
    ]
});