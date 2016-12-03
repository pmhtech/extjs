Ext.define('SysApp.view.sys.code.SysCode', {
    extend: 'SysApp.view.content.HBoxDefaultView',

    alias: 'widget.sys-code',
    controller: 'sys-code',
    leftItems: [{
        xtype: 'sys-code-grid',
        reference: 'sys-code-grid',
        title: '코드그룹목록 ',
        onGridSelect: 'onSelectGrid'
    }],
    rightItems: [{
        xtype: 'sys-code-detail-grid',
        layout : 'fit',
        title: '코드목록',
        flex: 1,
        onGridSelect: 'onSelectDetailGrid'
    }, {
        xtype: 'sys-code-locale-tabpanel',
        layout : 'fit',
        flex: 3
    }]
});