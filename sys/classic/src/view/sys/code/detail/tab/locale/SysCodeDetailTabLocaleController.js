Ext.define('SysApp.view.sys.code.detail.SysCodeDetailTabLocaleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-detail-tab-locale',


    onInitMode : function(form){
        form.getForm().reset();
        form.down('#refFields').removeAll();
        var fields =[{
            xtype: 'textfield',
            fieldLabel: '관리항목1',
            name: 'REF1'
        }, {
            xtype: 'textfield',
            fieldLabel: '관리항목2',
            name: 'REF2'
        }, {
            xtype: 'textfield',
            fieldLabel: '관리항목3',
            name: 'REF3'
        }, {
            xtype: 'textfield',
            fieldLabel: '관리항목4',
            name: 'REF4'
        }, {
            xtype: 'textfield',
            fieldLabel: '관리항목5',
            name: 'REF5'
        }];

        form.down('#refFields').add(fields);
        form.setReadOnlyFields(true);
    },
    onInsertMode : function(form){
        form.setReadOnlyFields(false, ['COMPANY','CODE','CODE_NM','MEMO']);
        form.setReadOnlyFields(true, ['PRE_CD' ]);
    },
    onUpdateMode : function(form){
        form.setReadOnlyFields(false, ['CODE_NM','MEMO']);
        form.setReadOnlyFields(true, ['COMPANY', 'PRE_CD','CODE']);
    },


    onChangeUSE_YN : function(field,newValue,oldValue){


        var locales = this.getView().up('tabpanel').query('sys-code-detail-tab-locale');

        for(var i=0;i<locales.length;i++){
            var radiogroup = locales[i].down('[name=USE_YN]').up();
            radiogroup.setValue(newValue);
        }
    },
    onChangeSORT: function(field,newValue,oldValue){


        var locales = this.getView().up('tabpanel').query('sys-code-detail-tab-locale');

        for(var i=0;i<locales.length;i++){
            locales[i].down('[name='+field.name+']').setValue(newValue);
        }
    }
});