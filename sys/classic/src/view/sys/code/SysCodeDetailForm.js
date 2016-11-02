Ext.define('SysApp.view.sys.code.SysCodeDetailForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sys_code_detail_form',
    controller: 'sys_code',
    items: [{
        xtype: 'pmh-combo',
        fieldLabel: '회사코드',
        sysCodeName : 'COM_000004',
        name: 'COMPANY',
        queryMode : 'local',
        displayField : 'CODE_NM',
        valueField : 'CODE',
        listeners : {
           beforerender : function(comp){

               var store = Ext.create('Ext.data.Store',{
                   data :SysCode[comp.sysCodeName]
               });
               comp.setStore(store);
           }
        }
    }, {
        xtype: 'kpmg_radio_base',
        radioItems : [{
            xtype: 'radiofield',
            boxLabel: 'No',
            name: 'INACTIVE',
            inputValue: 'N',
            checked: true
        }, {
            xtype: 'radiofield',
            boxLabel: 'Yes',
            name: 'INACTIVE',
            inputValue: 'Y'
        }]
        fieldLabel: '코드그룹',
        name: 'PRE_CD'
    }, {
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
    }]

});