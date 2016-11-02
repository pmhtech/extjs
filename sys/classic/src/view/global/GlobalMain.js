Ext.define('SysApp.view.global.GlobalMain', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.global_main',
    requires: [
        'SysApp.view.global.north.GlobalNorth',
        'SysApp.view.global.center.GlobalCenter',
        'SysApp.view.global.west.GlobalWest',

        'Ext.layout.container.Border',
        'Ext.resizer.Splitter',
        'Ext.panel.Panel',
        'SysApp.view.dashboard.SiteMap',
        'SysApp.view.sys.code.SysCode',
        'SysApp.view.menu.MenuMgt'
    ],
    layout: {
        type: 'border'
    },
    style: 'background-color : #FEFEFE',
    border: false,
    items: [
        {
            xtype: 'global_north',
            region: 'north',
            layout : {
                type : 'hbox',
                align : 'stretch'
            },
            height: 22
        },
        {
            xtype: 'global_west',
            region: 'west',
            width: 150
        }, {
            xtype: 'container',
            layout: 'fit',
            region: 'center',
            items: [{
                xtype: 'global_center'
            }]
        }
    ]
});
