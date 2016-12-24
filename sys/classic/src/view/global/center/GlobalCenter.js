Ext.define('SysApp.view.global.center.GlobalCenter', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.global-center',
    layout: 'fit',
    items: [{
        xtype: 'tabpanel',
        bodyStyle : 'background-color:white',
        itemId : 'menu-tabpanel',
        border : '1px',
        defaults: {
            bodyPadding: 0,
            scrollable: true,
            closable: true,
            border: false
        }
    }]
});