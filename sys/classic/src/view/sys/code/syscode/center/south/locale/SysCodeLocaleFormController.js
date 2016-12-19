Ext.define('SysApp.view.sys.code.syscode.center.south.locale.SysCodeLocaleFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-locale-form',

    getInitRefFields : function(){
        return  [{
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
    },
    getInsertRefFields : function(record,defaultReadOnly){


        var fields = [];
        var LOCALE_CD=this.getView().LOCALE_CD;
        var locale = record.data.LANGUAGE[LOCALE_CD];
        var defaultLang = PmhTech.Utils.getDefaultLanguage();


        for (var j = 1; j <= 5; j++) {
            var name = 'REF' + j;

            var config = record.data[name + '_CONFIG'].split('-');

            var EDIT_YN = config[0];
            var FIELD_TYPE = config[1];
            var comboStore = config[2];


            var fieldLabel = Ext.isEmpty(locale[name]) ? '관리항목' + j : locale[name];
            var readOnly = defaultReadOnly && EDIT_YN == 'N';

            var field = null;
            switch (FIELD_TYPE) {
                case '10' :
                    field = {
                        xtype: 'textfield',
                        fieldLabel: fieldLabel,
                        name: name,
                        readOnly: readOnly
                    };
                    break;
                case '20' :
                    field = {
                        xtype: 'pmh-combo-code',
                        fieldLabel: fieldLabel,
                        name: name,
                        store: SysCode[comboStore].copy(false),
                        readOnly: readOnly
                    };
                    break;
                case '30' :
                    field = {
                        xtype: 'datefield',
                        fieldLabel: fieldLabel,
                        name: name,
                        readOnly: readOnly
                    };
                    break;
            }

            if (LOCALE_CD == defaultLang && EDIT_YN == 'N') {
                field.listeners = {
                    change: this.onChangeNotify,
                    scope: this
                }
            }

            fields.push(field);
        }
        return fields;


    },


    onInitMode: function () {

        var form = this.getView();
        form.getForm().reset();
        form.down('#refFields').removeAll();
        var fields =this.getInitRefFields();

        form.down('#refFields').add(fields);
        form.setReadOnlyFields(true);
    },
    onInsertMode: function (selmodel,record,index) {

        var form = this.getView();


        var PRE_CD = record.get('PRE_CD');

        form.getForm().forceReset();
        form.getForm().setValues({
            PRE_CD: PRE_CD,
            LOCALE_CD : form.LOCALE_CD,
            USE_YN: 'Y'
        });



        var defaultLang = PmhTech.Utils.getDefaultLanguage();
        var defaultReadOnly = (form.LOCALE_CD != defaultLang);

        var refFields = form.down('#refFields');
        refFields.removeAll();

        form.setReadOnlyFields(defaultReadOnly, ['COMPANY', 'CODE', 'USE_YN', 'SORT']);
        form.setReadOnlyFields(false, ['CODE_NM', 'MEMO']);

        var fields = this.getInsertRefFields(record,defaultReadOnly);
        refFields.add(fields);


    },
    onUpdateMode: function () {
        var form = this.getView();

        form.setReadOnlyFields(false, ['CODE_NM', 'MEMO']);
        form.setReadOnlyFields(true, ['COMPANY', 'PRE_CD', 'CODE']);
    },


    onChangeUSE_YN: function (field, newValue, oldValue) {


        var locales = this.getView().up('tabpanel').query('sys-code-locale-form');

        for (var i = 0; i < locales.length; i++) {
            var radiogroup = locales[i].down('[name=USE_YN]').up();
            radiogroup.setValue(newValue);
        }
    },
    onChangeNotify: function (field, newValue, oldValue) {


        var locales = this.getView().up('tabpanel').query('sys-code-locale-form');

        for (var i = 0; i < locales.length; i++) {
            locales[i].down('[name=' + field.name + ']').setValue(newValue);
        }
    }
});