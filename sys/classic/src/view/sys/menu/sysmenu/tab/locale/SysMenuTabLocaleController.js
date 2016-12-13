Ext.define('SysApp.view.sys.menu.sysmenu.tab.locale.SysMenuTabLocaleController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-menu-tab-locale',


	onInitMode: function (form) {
		this.onInsertMode(form);

	},
	onInsertMode: function (form) {
		form.getForm().resetClearFields();
		var findIdx = SysCode['COM_000002'].find('CODE', 'DEFAULT');
		var defaultLanguage = SysCode['COM_000002'].getAt(findIdx).get('REF1');
		var defaultReadOnly = form.LOCALE_CD != defaultLanguage;

		form.setReadOnlyFields(false,['MENU_NM','MEMO']);
		form.setReadOnlyFields(defaultReadOnly, ['SYSTEM','PRE_MENU_ID','MENU_ID','MENU_AUTH','WIDGET_NM','CLASS_NM','MENU_LVL','SORT', 'USE_YN']);



	},
	onUpdateMode: function (form) {

		var findIdx = SysCode['COM_000002'].find('CODE', 'DEFAULT');
		var defaultLanguage = SysCode['COM_000002'].getAt(findIdx).get('REF1');
		var defaultReadOnly = form.LOCALE_CD != defaultLanguage;

		form.setReadOnlyFields(true,['SYSTEM','PRE_MENU_ID','MENU_ID']);
		form.setReadOnlyFields(false,['MENU_NM','MEMO']);
		form.setReadOnlyFields(defaultReadOnly, ['MENU_AUTH','WIDGET_NM','CLASS_NM','MENU_LVL','SORT', 'USE_YN']);
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
	},
	onCollapsePicker : function(field){
		var rootNode =field.getStore().getRoot();

		var record = rootNode.findChild(field.valueField,field.getValue(),true);


		if(Ext.isEmpty(record) ||record.isLeaf()){
			PmhTech.Msg.alert('확인','상위메뉴만 선택해야만 합니다.',function(){

				field.reset();
			});
		}
	}
});