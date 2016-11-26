Ext.define('SysApp.view.sys.code.popup.SysCodePopup', {
    extend: 'PmhTech.window.Base',
    alias: 'widget.sys-code-popup',
    controller: 'sys-code-popup',
    width: 600,
    height: 600,
    closable: true,
    hidden: true,
    title: '기준정보그룹추가',
    floating: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'sys-code-form'
    }, {
        xtype: 'sys-code-ref',
        flex: 1
    }, {

        xtype: 'fieldset',
        collapsible : true,
        title: '다국어설정',
        items: [{
            xtype: 'tabpanel',
            itemId: 'sysCodeLocale',
            listeners: {
                afterrender: 'onAfterRenderLocale'
            }
        }
        ]
    }]
});