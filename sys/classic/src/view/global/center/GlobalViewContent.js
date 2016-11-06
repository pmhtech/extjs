Ext.define('SysApp.view.global.center.GlobalViewContent', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.global-center-view',
    layout: 'fit',
    items: [{
        xtype: 'tabpanel',
        defaults: {
            bodyPadding: 10,
            scrollable: true,
            closable: true,
            border: false
        }
    }]
});