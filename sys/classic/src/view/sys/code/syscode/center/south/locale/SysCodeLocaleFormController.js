Ext.define('SysApp.view.sys.code.syscode.center.south.locale.SysCodeLocaleFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-locale-form',


    onInitMode: function () {

        var form = this.getView();
        form.getForm().reset();
        form.down('#refFields').removeAll();
        var fields = [{
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
    onInsertMode: function () {
        var form = this.getView();
        form.getForm().resetClearFields();

        var PRE_CD = this.getView().up('sys-code').down('sys-code-group-grid').getSelectionModel().getSelection()[0].data.PRE_CD;


        form.getForm().setValues({
            PRE_CD: PRE_CD,
            LOCALE_CD : form.LOCALE_CD,
            USE_YN: 'Y'
        });
        var findIdx = SysCode['COM_000002'].find('CODE', 'DEFAULT');

        var rec = SysCode['COM_000002'].getAt(findIdx);

        if (rec.get('REF1') == form.LOCALE_CD) {

            form.setReadOnlyFields(false, ['COMPANY', 'CODE']);
        }

        form.setReadOnlyFields(false, ['CODE_NM', 'MEMO']);
        form.setReadOnlyFields(true, ['PRE_CD']);
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