Ext.define('SysApp.view.sys.code.detail.SysCodeForm', {
    extend: 'PmhTech.form.Panel',
    alias: 'widget.sys-code-form',
    title : '기본정보',
    controller: 'sys-code-popup',
    defaults: {
        columnWidth: 0.5,
        padding: '0 5 5 5'
    },
    items : [{
        xtype: 'pmh-combo-code',
        fieldLabel: '회사코드',
        sysCodeName : 'COM_000001',
        readOnly : true,
        hidden : true,
        name: 'COMPANY',
        value : '000000'
    }, {
        xtype: 'textfield',
        fieldLabel: '코드그룹',
        name: 'PRE_CD'
    },{
        xtype: 'textfield',
        fieldLabel: '코드',
        readOnly : true,
        value : '0000000000',
        name: 'CODE'
    }, {
        xtype: 'pmh-combo',
        fieldLabel: '참조 기준정보1',
        displayField : 'CODE_NM',
        valueField : 'PRE_CD' ,
        isShowCode: true,
        name: 'REF1_CODE'
    }, {
        xtype: 'pmh-combo',
        fieldLabel: '참조 기준정보2',
        displayField : 'CODE_NM',
        valueField : 'PRE_CD' ,
        name: 'REF2_CODE'
    }, {
        xtype: 'pmh-combo',
        fieldLabel: '참조 기준정보3',
        displayField : 'CODE_NM',
        valueField : 'PRE_CD' ,

        name: 'REF3_CODE'
    }, {
        xtype: 'pmh-combo',
        fieldLabel: '참조 기준정보4',
        displayField : 'CODE_NM',
        valueField : 'PRE_CD' ,
        name: 'REF4_CODE'
    }, {
        xtype: 'pmh-combo',
        fieldLabel: '참조 기준정보5',
        displayField : 'CODE_NM',
        valueField : 'PRE_CD' ,
        name: 'REF5_CODE'
    }, {
        xtype: 'textfield',
        fieldLabel: '사용유무',
        name: 'USE_YN'
    },{
        xtype : 'textfield',
        fieldLabel : '메모',
        name : 'MEMO'
    }]
});