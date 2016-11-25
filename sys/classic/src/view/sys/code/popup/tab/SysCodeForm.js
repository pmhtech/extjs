Ext.define('SysApp.view.sys.code.detail.SysCodeForm', {
    extend: 'PmhTech.form.Panel',
    alias: 'widget.sys-code-form',
    controller: 'sys-code-popup',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'fieldset',
        title: '기본정보',
        layout: 'column',
        defaults: {
            margin: '0 5 10 5',
            columnWidth: 0.5
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
        }]
    }, {
        xtype: 'fieldset',
        title: '참조3 정보',
        layout: 'column',
        defaults: {
            margin: '0 5 5 5',
        },
        items: [{
            xtype: 'checkboxfield',
            labelWidth: 0,
            columnWidth: 0.3,
            boxLabel: '참조3 값수정가능',
            name: 'REF3_EDIT_YN'

        }, {
            xtype: 'textfield',
            fieldLabel: '참조3 값입력형태',
            columnWidth: 0.3,
            name: 'REF3_TYPE'
        }, {
            xtype: 'textfield',
            columnWidth: 0.3,
            name: 'REF3_CD'
        }]
    },

        {
            xtype: 'textfield',
            fieldLabel: '사용유무',
            name: 'USE_YN'
        }, {
            xtype: 'textfield',
            fieldLabel: '메모',
            name: 'MEMO'
        }]
});