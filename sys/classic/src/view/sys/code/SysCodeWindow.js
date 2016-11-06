Ext.define('SysApp.view.sys.code.SysCodeWindow', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sys-code-window',
    controller: 'sys-code-window',
    modal : true,
    width : 400,
    closable: true,
    bodyPadding : 10,
    closeAction : 'hide',
    title : '기준정보그룹추가',
    floating : true,
    layout : 'column',
    defaults : {
        columnWidth : 0.5
    },
    items: [{
        xtype: 'textfield',
        fieldLabel: '회사코드',
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
    }, {
        xtype: 'textfield',
        fieldLabel: '회사코드',
        name: 'MEMO',
        columnWidth: 1
    }],
    bbar : [
        {
            xtype : 'button',
            text : '저장',
            handler : 'onBtnSave',
            scope : this
        },{
            xtype : 'button',
            text : '닫기',
            handler : 'onBtnClose',
            scope : this
        }

    ]
});