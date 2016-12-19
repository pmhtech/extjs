Ext.define('SysApp.view.sys.role.sysrole.west.south.locale.SysRoleLocaleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-locale',

    onInitMode : function(comp){
        this.onInsertMode(comp);
    },
    onInsertMode : function(comp){
        var form = comp;

        form.getForm().forceReset();
        var findIdx = SysCode['COM_000002'].find('CODE', 'DEFAULT');
        var defaultLanguage = SysCode['COM_000002'].getAt(findIdx).get('REF1');
        var defaultReadOnly = form.LOCALE_CD != defaultLanguage;

        form.setReadOnlyFields(false);
        form.setReadOnlyFields(defaultReadOnly, ['SYSTEM','MENU_AUTH','USE_YN','SORT']);
    },
    onUpdateMode : function(comp){
        var form = this.getView();

        var findIdx = SysCode['COM_000002'].find('CODE', 'DEFAULT');
        var defaultLanguage = SysCode['COM_000002'].getAt(findIdx).get('REF1');
        var defaultReadOnly = form.LOCALE_CD != defaultLanguage;


        form.setReadOnlyFields(true,['SYSTEM']);
        form.setReadOnlyFields(false,['ROLE_NM','MEMO']);
        form.setReadOnlyFields(defaultReadOnly, ['USE_YN','SORT']);
    },
    onChangeUSE_YN: function (field, newValue, oldValue) {

        var locales = this.getView().up('tabpanel').query('sys-role-locale');

        for (var i = 0; i < locales.length; i++) {
            var radiogroup = locales[i].down('[name=USE_YN]').up();
            radiogroup.setValue(newValue);
        }
    },
    onChangeNotify: function (field, newValue, oldValue) {


        var locales = this.getView().up('tabpanel').query('sys-role-locale');

        for (var i = 0; i < locales.length; i++) {
            locales[i].down('[name=' + field.name + ']').setValue(newValue);
        }
    }
});
