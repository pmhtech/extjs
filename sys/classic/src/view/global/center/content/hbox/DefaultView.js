Ext.define('SysApp.view.global.content.hbox.DefaultView', {
    extend: 'Ext.panel.Panel',
    alternateClassName: ['SysApp.view.content.HBoxDefaultView'],
    alias: ['widget.global-hbox-defaultview'],
    layout: {
        type : 'hbox',
        align : 'stretch'
    },
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'container',
                items: [{
                    xtype: 'container',
                    itemId: 'leftContents',
                    flex: 1,
                    layout : {
                        type : 'vbox',
                        align : 'stretch'
                    },
                    items: me.leftItems
                }]
            },{
                xtype: 'container',
                items: [{
                    xtype: 'container',
                    itemId: 'rightContents',
                    flex: 1,
                    layout : {
                        type : 'vbox',
                        align : 'stretch'
                    },
                    items: me.rightItems
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