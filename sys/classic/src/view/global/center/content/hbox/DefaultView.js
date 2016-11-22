Ext.define('SysApp.view.global.content.hbox.DefaultView', {
    extend: 'SysApp.view.content.DefaultView',
    alternateClassName: ['SysApp.view.content.HBoxDefaultView'],
    alias: ['widget.global-hbox-defaultview'],
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    rightItems: [],
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'container',
                flex: 1,
                items: [{
                    xtype: 'container',
                    itemId: 'leftContents',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: me.leftItems
                }]
            }, {
                xtype: 'container',
                flex: 1,
                itemId: 'rightContents',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: me.rightItems
            }]
        });
        me.callParent(arguments);
    }
});