Ext.define('SysApp.view.code.syscode.popup.form.SysCodePopupForm', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.sys-code-popup-form',
    controller: 'sys-code-popup',
    layout: 'fit',
    collapsible: true,
    title: '기본정보',

    items : [{
        xtype : 'pmhtech-form',
        border : false,
        itemId : 'sysCodeForm',
        frame : false,
        defaults: {
            columnWidth: 0.5,
            margin: '0 5 5 5'
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: '코드그룹',
            name: 'PRE_CD'
        },{
           xtype : 'numberfield',
            hidden : true,
            name :'SORT',
            value : -1
        } ,{
            xtype: 'textfield',
            fieldLabel: '회사코드',
            readOnly: true,
            hidden: true,
            value: '000000',
            name: 'COMPANY'
        }, {
            xtype: 'textfield',
            fieldLabel: '코드',
            readOnly: true,
            hidden: true,
            value: '0000000000',
            name: 'CODE'
        }, {
            xtype: 'pmh-radio-group',
            fieldLabel: '사용유무',
            name: 'USE_YN',
            radioItems: [{
                xtype: 'radio',
                inputValue: 'Y',
                name: 'USE_YN',
                boxLabel: '사용'
            }, {
                xtype: 'radio',
                inputValue: 'N',
                name: 'USE_YN',
                boxLabel: '미사용'
            }]
        }, {
            xtype: 'textfield',
            fieldLabel: '메모',
            columnWidth : 1,
            name: 'MEMO'
        }]

    }]

});