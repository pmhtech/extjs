Ext.define('SysApp.view.sys.menu.tab.locale.SysMenuTabLocaleController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-menu-tab-locale',


	onInitMode: function (form) {

	},
	onInsertMode: function (form) {

	},
	onUpdateMode: function (form) {

	},


	onChangeUSE_YN: function (field, newValue, oldValue) {


		var locales = this.getView().up('tabpanel').query('sys-menu-tab-locale');

		for (var i = 0; i < locales.length; i++) {
			var radiogroup = locales[i].down('[name=USE_YN]').up();
			radiogroup.setValue(newValue);
		}
	},
	onChangeNotify: function (field, newValue, oldValue) {


		var locales = this.getView().up('tabpanel').query('sys-menu-tab-locale');

		for (var i = 0; i < locales.length; i++) {
			locales[i].down('[name=' + field.name + ']').setValue(newValue);
		}
	}
});