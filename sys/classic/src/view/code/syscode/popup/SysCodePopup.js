Ext.define('SysApp.view.code.syscode.popup.SysCodePopup', {
    extend: 'PmhTech.window.Base',
    alias: 'widget.sys-code-popup',
    controller: 'sys-code-popup',
    width: 600,
    height : undefined,
    closable: true,
    hidden: true,
    title: '기준정보그룹추가',
    floating: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults : {
        margin : 10
    },
    items: [{
        xtype: 'sys-code-popup-form',
        height : 100
    }, {
        xtype: 'sys-code-popup-ref',
        height : 180
    }, {
        xtype: 'sys-code-popup-tab',
        title: '다국어설정',
        height : 200
    }],
    dockedItems : [{
        xtype : 'pmh-button-toolbar',
        btnItems : ['save','close'],
        dock : 'bottom'

    }]
});