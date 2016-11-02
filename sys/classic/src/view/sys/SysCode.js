Ext.define('SysApp.view.sys.code.SysCode', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sys_code',
    requires: [
        'SysApp.view.sys.code.SysCodeGrid',
        'SysApp.view.sys.code.SysCodeWindow',
        'SysApp.view.sys.code.SysCodeDetailGrid',
        'SysApp.view.sys.code.SysCodeDetailForm'
    ],
    controller: 'sys_code',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'sys_code_grid',
        layout : 'fit',
        flex : 1,
        title : '기준정보'
    }, {
        xtype: 'panel',
        flex : 1,
        title : '기준정보 상세',
        layout : {
            type : 'vbox',
            align : 'stretch'
        },
        itemId : 'sys_code_detail',
        items: [{
            xtype: 'sys_code_detail_grid',
            height : 300
        }, {
            xtype: 'sys_code_detail_form',
            layout: 'column',
            height : 400,
            defaults: {
                columnWidth: 0.5
            }
        }]
    }]

});