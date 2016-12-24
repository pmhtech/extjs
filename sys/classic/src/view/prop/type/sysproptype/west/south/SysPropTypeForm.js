
Ext.define('SysApp.view.prop.type.sysproptype.west.south.locale.SysPropTypeForm',{
    extend: 'PmhTech.form.Panel',
    alias : 'widget.sys-prop-type-form',
    controller: 'sys-prop-type-form',

    items : [{
        xtype : 'textfield',
        fieldLabel : 'XType 명',
        name : 'XTYPE_NM'
    },{
        xtype : 'textfield',
        fieldLabel : 'Class 명',
        name : 'CLAZZ_NM'
    },{
        xtype: 'pmhtech-radio-base',
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
        }],
    }, {
        xtype : 'textfield',
        fieldLabel : '사용유무',
        name : 'PROPS'
    },{
        xtype : 'numberfield',
        fieldLabel : '정렬순서',
        name : 'SORT'
    }]
});
