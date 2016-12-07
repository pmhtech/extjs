Ext.define('SysApp.view.sys.code.SysCode', {
    extend: 'SysApp.view.content.HBoxDefaultView',
    alias: 'widget.sys-code',
    requires : ['SysApp.view.sys.code.popup.SysCodePopup'],
    controller: 'sys-code',
    leftItems: [{
        title: '코드그룹목록 ',
        xtype: 'sys-code-group',
        onGridSelect: 'onSelectGrid'

    }],
    rightItems: [{
        xtype: 'sys-code-detail-grid',
        title: '코드목록',
        layout : 'fit',
        flex: 1,
        onGridSelect: 'onSelectDetailGrid'
    },{
        xtype: 'sys-code-detail-tab',
        layout : 'fit',
        flex: 3
    }]
});