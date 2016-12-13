Ext.define('SysApp.view.login.LoginFormController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.login_form',
	doLoginProcess: function () {
		var paramObj = this.getView().getForm().getValues();

		PmhTech.Ajax.request({
			url: Ext.String.format('/users/{0}/login', paramObj.USER_ID),
			params: {
				LoginData: Ext.encode(paramObj)
			},
			success: this.successLoginProcess,
			scope: this
		});
	},
	successLoginProcess: function (resObj) {

		var sysMenus = resObj.sysMenu;
		var treeStore = Ext.StoreMgr.lookup('Navigation');
		treeStore.doLoadData(sysMenus);


		this.getView().hide();
		Ext.iterate(resObj.sysCodeGroup, function (key, value) {

			SysCode[key] = Ext.create('Ext.data.Store', {
				data: value
			});

		});

		var findIdx = SysCode['COM_000002'].find('CODE','DEFAULT');
		var defaultLang = SysCode['COM_000002'].getAt(findIdx).get('REF1');

		findIdx = SysCode['COM_000003'].find('CODE',defaultLang);

		SysCode['COM_000003'].getAt(findIdx).set('SORT',0);
		SysCode['COM_000003'].sort('SORT','ASC');

		Ext.create('SysApp.view.global.GlobalMain', {
			renderTo: Ext.getBody(),
			listeners: {
				afterrender: function (comp) {
					var MenuController = SysApp.getApplication().getController('menu.MenuController');
					MenuController.handleRoute(location.hash.substr(1));
				}
			}
		});

	},
	showJoinPopup: function () {
		this.getView().hide();

		var popup = Ext.ComponentQuery.query('join_form')[0];

		if (!popup) {
			var popup = Ext.widget('join_form');
		}

		popup.show();
	},
	onAfterRender: function (comp) {

		//comp.show();
		this.doLoginProcess();


	}
});