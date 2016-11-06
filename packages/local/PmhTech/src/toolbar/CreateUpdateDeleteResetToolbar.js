Ext.define('KPMG.toolbar.CreateUpdateDeleteResetToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.create_update_delete_reset_toolbar',
    requires: [
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],
    onBtnInsert: 'onBtnInsert',
    onBtnUpdate: 'onBtnUpdate',
    onBtnDelete: 'onBtnDelete',
    onBtnReset: null,
    border: '1 0 0 0',
    height : 50,
    style: {
        align: 'bottom'
    },

    initComponent: function () {
        var me = this;


        if(Ext.isEmpty(me.onBtnReset)){
            me.onBtnReset= function(button){
                button.up('form').getForm().reset();
            }
        }



        Ext.apply(me, {
            defaults : {
                width : 70,
                height : 30
            },
            items: [{
                xtype: 'tbfill'
            }, {
                xtype: 'pmhtech-button-insert',
                handler : me.onBtnInsert
            }, {
                xtype: 'pmhtech-button-update',
                handler : me.onBtnUpdate
            }, {
                xtype: 'pmhtech-button-delete',
                handler : me.onBtnDelete
            }, {
                xtype: 'pmhtech-button-reset',
                handler : me.onBtnReset
            }]

        });
        me.callParent(arguments);
    }

});