Ext.define('SysApp.view.global.center.GlobalCenter', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.global-center',
    layout: 'fit',
    items: [{
        xtype: 'tabpanel',
        itemId : 'mainTab',
        defaults: {
            bodyPadding: 0,
            scrollable: true,
            closable: true,
            border: false
        }
    }]
});