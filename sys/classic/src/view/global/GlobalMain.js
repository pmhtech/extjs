Ext.define('SysApp.view.global.GlobalMain', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.global-main',
    layout: {
        type: 'border'
    },
    style: 'background-color : #FEFEFE',
    border: false,
    items: [{
            xtype: 'global-north',
            region: 'north',
            layout : {
                type : 'hbox',
                align : 'stretch'
            },
            height: 22
        },
        {
            xtype: 'global-west',
            region: 'west',
            collapsible: true,
            width: 220,
            maxHeight : 500
        },{
            xtype: 'container',
            layout: 'fit',
            region: 'center',
            items: [{
                xtype: 'global-center'
            }]
        }
    ]
});
