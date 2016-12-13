Ext.define('SysApp.view.sys.role.sysrole.west.south.locale.SysRoleLocaleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-locale',
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
