Ext.define('SysApp.store.SysMenu', {
    extend: 'Ext.data.Store',
    alias: 'store.sysmenu',
    fields: [
        'name', 'email', 'phone'
    ],
    autoLoad : true,
    proxy: {
        type: 'ajax',
        url: 'resources/dev/json/menu.json',
        reader: {
            type: 'json',
            rootProperty: 'contents'
        }
    }
});