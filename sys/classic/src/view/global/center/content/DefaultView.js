Ext.define('SysApp.view.global.content.DefaultView', {
    extend: 'Ext.panel.Panel',
    alternateClassName: ['SysApp.view.content.DefaultView'],
    alias: ['widget.global-defaultview'],
    layout: 'fit',


    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'container',
                    itemId: 'centerContent',
                    flex: 1,
                    items: me.centerItems
                }]
            }],
            listeners: {
                beforerender: 'onBeforeGlobalDefaultView'
            }
        });
        me.callParent(arguments);
    },
    onBeforeGlobalDefaultView: function (comp) {


    }
});