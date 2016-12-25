Ext.define('SysApp.view.prop.page.sysproppage.center.locale.SysPropPageLocaleController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-prop-page-locale',

	onBeforeEdit: function (editor, context) {

		var isDefaultLang = this.getView().LOCALE_CD == PmhTech.Utils.getDefaultLanguage();
		if (!isDefaultLang) {
			switch (context.field) {
				case  'DOM_QRY' :
				case  'DOM_TYPE' :
				case  'SORT' :
					return false;

			}
		}
		return true;
	},
	onUpdateStore: function (thisStore, rec, operation, modifiedFieldNames, details) {

		var locales = this.getView().up('sys-prop-page-tab').query('#sysPropPageLocale');
		var idx = thisStore.find('id', rec.data.id);

		if(operation == 'edit') {

			for (var i = 0; i < locales.length; i++) {
				var findRec = locales[i].getStore().getAt(idx);
				findRec.set({
					DOM_QRY: rec.get('DOM_QRY'),
					DOM_TYPE: rec.get('DOM_TYPE'),
					DOM_PROPS: rec.get('DOM_PROPS'),
					SORT: rec.get('SORT')
				});
			}


			if(modifiedFieldNames[0]=='DOM_TYPE'){
				this.onChangePropertyGrid(rec.get('DOM_TYPE'));

			}
		}
	},
	onChangePropertyGrid: function (DOM_TYPE) {

		debugger;
		var field =this.getView().down('#sysPropPageLocale [dataIndex=DOM_TYPE]').getEditor();

		var findIdx = field.getStore().find('XTYPE_NM', DOM_TYPE);

		var PROPS = field.getStore().getAt(findIdx).data.PROPS;

		var source = Ext.decode(PROPS);
		var tempObj = {};


		for (var i = 0; i < source.length; i++) {
			var data = source[i];
			tempObj[data.KEY] = data.DEFAULT_VALUE;
		}

		this.getView().down('propertygrid').setSource(tempObj);
	}


});