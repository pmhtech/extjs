Ext.define('SysApp.view.sys.code.popup.SysCodePopup', {
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
        xtype: 'sys-code-form',
        height : 100
    }, {
        xtype: 'sys-code-ref',
        height : 200
    }, {


        xtype: 'fieldset',
        collapsible : true,

        title: '다국어설정',
        height : 250,
        items: [{
            xtype: 'tabpanel',
            itemId: 'sysCodeLocale',
            listeners: {
                afterrender: 'onAfterRenderLocale'
            }
        }]
    }],
    dockedItems : [{
        xtype : 'toolbar',
        docked : 'bottom',
        items : [{
            xtype : 'pmhtech-button-update',
            handler : 'onBtnSave'
        }]

    }]
});