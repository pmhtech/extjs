Ext.define('SysApp.view.sys.code.SysCode', {
    extend: 'SysApp.view.content.HBoxDefaultView',
    alias: 'widget.sys-code',
    controller : 'sys-code',
    requires: [
        'SysApp.view.sys.code.SysCodeGrid'
    ],
    leftItems : [{
        xtype : 'sys-code-grid'
    }]

});