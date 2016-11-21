Ext.define('SysApp.view.sys.code.detail.SysCodeDetailForm', {
    extend: 'PmhTech.form.Panel',
    alias: 'widget.sys-code-detail-form',
    controller: 'sys-code-detail-form',
    defaults: {
        columnWidth: 0.5,
        padding: '0 5 5 5'
    },
    items : [{
        xtype: 'pmh-combo-code',
        fieldLabel: '회사코드',
        sysCodeName : 'COM_000001',
        name: 'COMPANY'
    }, {
        xtype: 'textfield',
        fieldLabel: '코드그룹',
        name: 'PRE_CD'
    }, {
        xtype : 'textfield',
        fieldLabel : '언어설정',
        queryMode : 'local',
        name : 'LOCALE_CD',
        displayField : 'CODE_NM',
        valueField : 'CODE'
    },{
        xtype: 'textfield',
        fieldLabel: '코드',
        name: 'CODE'
    }, {
        xtype: 'textfield',
        fieldLabel: '코드명',
        name: 'CODE_NM'
    }, {
        xtype: 'textfield',
        fieldLabel: '참조1',
        name: 'REF1'
    }, {
        xtype: 'textfield',
        fieldLabel: '참조2',
        name: 'REF2'
    }, {
        xtype: 'textfield',
        fieldLabel: '참조3',
        name: 'REF3'
    }, {
        xtype: 'textfield',
        fieldLabel: '참조4',
        name: 'REF4'
    }, {
        xtype: 'textfield',
        fieldLabel: '참조5',
        name: 'REF5'
    }, {
        xtype: 'textfield',
        fieldLabel: '사용유무',
        name: 'USE_YN'
    }],listeners : {
        InitMode : 'onInitMode',
        UpdateMode : 'onUpdateMode',
        InsertMode : 'onInsertMode'
    }


});