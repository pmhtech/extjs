Ext.define('PmhTech.grid.Base', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pmhtech-grid-base',
    storeProps: {
        fields: [],
        url: null,
        method: null,
        rootProperty: 'list'
    },
    onGridLoad: Ext.emptyFn,
    //onGridSelect: Ext.emptyFn,

    initComponent: function () {
        var me = this;
        var storeProxy = {
            type: 'memory',
            url: me.storeProps.url,//'/payroll/code/pay-date/list',
            method: me.storeProps.method,
            reader: {
                type: 'json',
                rootProperty: Ext.isEmpty(me.storeProps.rootProperty) ? 'list' : me.storeProps.rootProperty
            }
        };

        Ext.apply(me, {
            plugins: [{
                ptype: 'bufferedrenderer'
            }
            ],
            store: Ext.create('Ext.data.Store', {
                fields: me.storeProps.fields,
                autoLoad: me.storeProps.autoLoad,
                proxy: storeProxy,
                listeners: {
                    load: function (store) {
                        me.show();
                        me.fireEvent('storeload', store)
                    }
                }
            }),
            listeners: {
                select: me.onGridSelect,
                storeLoad: me.onGridLoad
            }
        });
        me.callParent(arguments);
    }
});