Ext.define('PmhTech.grid.Base', {
    extend: 'Ext.grid.Panel',
    alias: ['widget.pmhtech-grid-base','widget.pmh-grid-base'],
    storeProps: {
        url: null,
        fields: [],
        rootProperty: null
    },
    excelMode: false,
    frame: true,
    isGlobal: false,
    usePagingToolbar: true,
    dragTarget: null,
    dropTarget: null,
    ddGroup: null,
    enableDrag: true,
    enableDrop: true,
    dropZone: null,
    rowNumberer: 38,
    emptyText: 'No data to display',

    initComponent: function () {
        var me = this;

        var columns = Ext.clone(me.columns);



        if (Ext.isNumber(me.rowNumberer)) {
            if (Ext.isArray(me.columns)) {
                columns.unshift({xtype: 'rownumberer', text: '#', width: me.rowNumberer});
            }
        }

        var plugins = [{
            ptype: 'bufferedrenderer'
        }];

        Ext.apply(me, {
            columns: columns,
            store: me.configStore(),
            dockedItems: me.configDockedItems(),
            plugins: plugins,
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    containerScroll: true,
                    enableDrag: me.enableDrag,
                    enableDrop: me.enableDrop,
                    dragGroup: me.dragGroup,
                    dropGroup: me.dropGroup,
                    ddGroup: me.ddGroup,
                    // The right hand drop zone gets special styling
                    // when dragging over it.
                    dropZone: {
                        overClass: me.dropZone
                    }
                }
            },
            listeners: {
                select: Ext.emptyFn,
                storeLoad: Ext.emptyFn,
                storeAdd: Ext.emptyFn,
                storeRemove: Ext.emptyFn,
                afterrender: Ext.emptyFn
            }
        });
        me.callParent(arguments);
    },
    configStore: function () {

        var me = this;
        if(me.store){
            return me.store;
        }

        return Ext.create('Ext.data.Store', {
            fields: Ext.isArray(me.storeProps.fields) ? Ext.clone(me.storeProps.fields) : [],
            autoLoad: me.storeProps.autoLoad,
            proxy: {
                type: Ext.isEmpty(me.storeProps.url) ? 'memory':'ajax',
                url: me.storeProps.url,
                reader: {
                    type: 'json',
                    rootProperty: me.storeProps.rootProperty
                }
            },
            listeners: {
                load: function (store) {
                    me.show();
                    this.fireEventArgs('storeLoad', arguments);
                },
                add: function (store) {

                    this.fireEventArgs('storeAdd', arguments);
                },
                remove: function (store) {

                    this.fireEventArgs('storeRemove', arguments);
                },
                scope: me

            }
        });


    }, configDockedItems: function () {

        var me = this;
        if (!me.dockedItems) {
            me.dockedItems = [];
        }


        var dockedItems = Ext.isArray(me.dockedItems) ? Ext.clone(me.dockedItems) : [];


        if (me.usePagingToolbar) {
/*            dockedItems.push({
                xtype: 'kpmg_pagingtoolbar',
                dock: 'bottom'
            });*/
        }

        return dockedItems;

    }
});