Ext.define('SysApp.view.sys.code.popup.tab.SysCodeForm', {
    extend: 'PmhTech.form.Panel',
    alias: 'widget.sys-code-form',
    controller: 'sys-code-popup',
    layout: 'fit',
    border: false,
    defaults: [],
    items: [{
        xtype: 'fieldset',
        layout: 'column',
        collapsible: true,
        title: '기본정보',
        defaults: {
            columnWidth: 0.5,
            margin: '0 5 5 5'
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: '코드그룹',
            name: 'PRE_CD'
        }, {
            xtype: 'textfield',
            fieldLabel: '코드그룹명',
            readOnly: true,
            value: '0000000000',
            name: 'CODE_NM'
        }, {
            xtype: 'textfield',
            fieldLabel: '코드',
            readOnly: true,
            hidden: true,
            value: '0000000000',
            name: 'CODE'
        }, {
            xtype: 'textfield',
            fieldLabel: '사용유무',
            name: 'USE_YN'
        }, {
            xtype: 'textfield',
            fieldLabel: '메모',
            name: 'MEMO'
        }]
    }]

});