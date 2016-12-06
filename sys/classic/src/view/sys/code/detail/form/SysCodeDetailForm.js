Ext.define('SysApp.view.sys.code.detail.form.SysCodeDetailForm', {
    extend: 'PmhTech.form.Panel',
    alias: 'widget.sys-code-detail-form',
    controller: 'sys-code-detail-form',
    layout : 'column',
    defaults: {
        columnWidth: 0.5,
        margin: '0 5 5 5'
    },
    bodyPadding : 5,
    border : false,
    items : [{
        xtype: 'pmh-combo-code',
        fieldLabel: '회사코드',
        sysCodeName : 'COM_000001',
        name: 'COMPANY'
    }, {
        xtype: 'textfield',
        fieldLabel: '코드그룹',
        name: 'PRE_CD'
    },{
        xtype: 'textfield',
        fieldLabel: '코드',
        name: 'CODE'
    },{
        xtype: 'pmhtech-radio-base',
        fieldLabel: '사용유무',
        radioItems : [{
            xtype : 'radio',
            inputValue : 'Y',
            boxLabel : '사용'
        },{
            xtype : 'radio',
            inputValue : 'N',
            boxLabel : '미사용'
        }]
    }]


});