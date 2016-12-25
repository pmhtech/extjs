Ext.define('PmhTech.form.field.combo.Base',{
    extend : 'Ext.form.field.ComboBox',
    alias: ['widget.pmh-combobox', 'widget.pmh-combo'],
    isShowCode : false,
    storeProps: {
        url: null,
        fields: [],
        rootProperty: null
    },
    initComponent : function(){
        var me = this;

        if(me.isShowCode===true){
            Ext.apply(me,{
                tpl: Ext.create('Ext.XTemplate',
                    '<tpl for="."><div class="x-boundlist-item">[{' + me.valueField + '}]&nbsp;&nbsp;{' + me.displayField + '}</div></tpl>'
                ),
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">[{' + me.valueField + '}]  {' + me.displayField + '}</tpl>'
                )
            });
        }

        Ext.apply(me,{
            store : me.configStore(),
            listeners: {
                select: Ext.emptyFn,
                storeLoad: Ext.emptyFn,
                storeAdd: Ext.emptyFn,
                storeRemove: Ext.emptyFn,
                storeUpdate: Ext.emptyFn,
                afterrender: Ext.emptyFn
            }
        });


        me.callParent(arguments);
    },
    configStore: function () {

        var me = this;
        if (me.store) {

            return me.store;
        }

        return Ext.create('Ext.data.Store', {
            fields: Ext.isArray(me.storeProps.fields) ? Ext.clone(me.storeProps.fields) : [],
            autoLoad: me.storeProps.autoLoad,
            proxy: {
                type: Ext.isEmpty(me.storeProps.url) ? 'memory' : 'ajax',
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
                update: function (store) {
                    this.fireEventArgs('storeUpdate', arguments);
                },
                scope: me

            }
        });


    }
});