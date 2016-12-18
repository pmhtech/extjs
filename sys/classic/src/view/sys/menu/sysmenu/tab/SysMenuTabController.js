Ext.define('SysApp.view.sys.menu.sysmenu.tab.SysMenuTabController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-menu-tab',

	onInitMode: function (comp) {

		var forms = this.getView().query('form');
		for (var i = 0; i < forms.length; i++) {
			var form = forms[i];
			form.fireEventArgs('InitMode', arguments);
		}

	},
	onUpdateMode: function (selmodel,record,index) {

		var forms = this.getView().query('form');
		for (var i = 0; i < forms.length; i++) {
			var form = forms[i];
			form.fireEvent('UpdateMode', arguments);

		}

	},
	onAfterRender: function (comp) {

		var defaultLanguage = PmhTech.Utils.getDefaultLanguage();

		var localeStore = SysCode['COM_000003'];
		var items = [];


		for (var i = 0; i < localeStore.getCount(); i++) {
			var rec = localeStore.getAt(i);
			if (rec.get('CODE') == 'ALL') {
				continue;
			}

			var locale = rec.get('CODE');
			var title = localeStore.getAt(i).get('CODE_NM');

			if (defaultLanguage == locale) {
				title = '<b>' + title + '(Default)</b>';
			}
			items.push({
				xtype: 'sys-menu-tab-locale',
				LOCALE_CD: locale,
				title: title
			});
		}
		comp.add(items);
		comp.setActiveTab(0);
	}
});