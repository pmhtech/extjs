Ext.define('PmhTech.form.field.find.Base', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.pmhtech-find-base',
    layout: {
        type: 'hbox',
        align: 'bottom'
    },
    gridItemId : null,


    initComponent: function () {
        var me = this;


        if(Ext.isEmpty(me.handler)){
            me.handler = function(button){

                var activeTab = this.up('global_center tabpanel').getActiveTab();
                var grid = activeTab.down('#'+me.gridItemId);
                grid.getStore().load();
                grid.show();
            }
        }

        Ext.apply(me,{
            fieldLabel : null,
            items: [{
                xtype: Ext.isEmpty(me.fieldXtype)? 'textfield' : me.fieldXtype,
                flex : 1,
                fieldLabel : me.fieldLabel,
                emptyText : me.emptyText,
                name : me.name,
                value : me.value,
                allowBlank : me.allowBlank
            }, {
                xtype: 'button',
                width: 89,
                iconCls : 'x-fa fa-search',
                text: 'Find',
                handler: me.handler
            }]

        });
        me.callParent(arguments);

    }


});