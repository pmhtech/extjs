Ext.define('KPMG.toolbar.ViewResetToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.viewreset_toolbar',
    requires: [
        'Ext.toolbar.Fill',
        'Ext.button.Button'
    ],
    defaults: {
        width: 70,
        height: 35
    },
    items: [{
        xtype: 'tbfill'
    }, {
        xtype: 'kpmg_button_preview',
        text: '보기'
    }, {
        xtype: 'kpmg_button_reset',
        text: '리셋'
    }]
});