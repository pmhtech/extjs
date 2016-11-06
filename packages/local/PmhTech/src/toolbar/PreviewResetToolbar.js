Ext.define('KPMG.toolbar.PreviewResetToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.preview_reset_toolbar',
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
                xtype: 'button',
                iconCls :'x-fa fa-search',
                text: '보기',
                handler : me.onBtnInsert
            },{
                xtype: 'button',
                text: '삭제',
                iconCls :'x-fa fa-trash',
                handler : me.onBtnDelete
            }]

        });
        me.callParent(arguments);


    }


});