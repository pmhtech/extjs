Ext.define('KPMG.toolbar.PreviewCreateDeleteResetToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.preview_create_delete_reset_toolbar',
    requires: [
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            defaults : {
                width : 70,
                height : 35
            },
            items: [{
                xtype: 'tbfill'
            }, {
                xtype: 'kpmg_button_preview',
                handler : me.onBtnPreview
            }, {
                xtype: 'kpmg_button_insert',
                handler : me.onBtnInsert
            }, {
                xtype: 'kpmg_button_delete',
                handler : me.onBtnDelete
            }, {
                xtype: 'kpmg_button_reset',
                handler : me.onBtnReset
            }]

        });
        me.callParent(arguments);


    }


});