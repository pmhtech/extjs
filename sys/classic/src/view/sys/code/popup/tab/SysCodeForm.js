Ext.define('SysApp.view.sys.code.popup.tab.SysCodeForm', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.sys-code-form',
    controller: 'sys-code-popup',
    layout: 'fit',
    collapsible: true,
    title: '기본정보',

    items : [{
        xtype : 'pmhtech-form',
        border : false,
        frame : false,
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
            fieldLabel: '코드',
            readOnly: true,
            hidden: true,
            value: '0000000000',
            name: 'CODE'
        }, {
            xtype: 'checkboxfield',
            boxLabel: '사용유무',
            uncheckedValue : 'N',
            inputValue : 'Y',
            name: 'USE_YN'
        }, {
            xtype: 'textfield',
            fieldLabel: '메모',
            columnWidth : 1,
            name: 'MEMO'
        }]

    }]

});