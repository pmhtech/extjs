Ext.define('PmhTech.grid.Base', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pmhtech-grid-base',
    storeProps: {
        url: null,
        fields: [],
        rootProperty: 'list'
    },
    excelMode: false,
    frame: true,
    isGlobal: false,
    onGridLoad: Ext.emptyFn,
    onGridSelect: Ext.emptyFn,
    onGridAfterRender: Ext.emptyFn,
    usePagingToolbar: true,
    dragTarget: null,
    dropTarget: null,
    height: '100%',
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

        if (me.excelMode == true) {
            plugins.push({ptype: 'cellediting'});
        }

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
                select: me.onGridSelect,
                storeLoad: me.onGridLoad,
                afterrender: me.onGridAfterRender
            }
        });
        me.callParent(arguments);
    },
    configStore: function () {

        var me = this;
        if (!Ext.isEmpty(me.store)) {
            return me.store;
        }


        return Ext.create('Ext.data.Store', {
            fields: Ext.isArray(me.storeProps.fields) ? Ext.clone(me.storeProps.fields) : [],
            autoLoad: me.storeProps.autoLoad,
            proxy: {
                type: 'ajax',
                url: me.storeProps.url,
                reader: {
                    type: 'json',
                    rootProperty: Ext.isEmpty(me.storeProps.rootProperty) ? 'list' : me.storeProps.rootProperty
                }
            },
            listeners: {
                load: function (store) {
                    me.show();
                    this.fireEvent('storeload', [store])
                }, scope: me

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