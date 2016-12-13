Ext.define('SysApp.view.sys.role.SysRoleController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-role',

	onAfterRender: function (comp) {
		PmhTech.Ajax.request({
			url: '/sys/menus',
			method: 'GET',
			params : {
				SYSTEM : 'ALL'
			},
			success: this.successMenuLoad,
			scope: this
		});

	},
	successMenuLoad: function (resObj) {


		var treeNode = PmhTech.Utils.convertListToTree(resObj['sysMenus'], 'MENU_ID', 'PRE_MENU_ID', "");
		var treeStore = this.getView().down('sys-role-tree').getStore();
		debugger;
		treeStore.snapshot = Ext.clone(treeNode);
		treeStore.setRoot({
			MENU_NM: 'ALL',
			text: 'ALL',
			id : 'root',
			expanded: true,
			children: treeNode
		});
	},


	onBtnSearch: function (button) {

		var form = this.getView().down('#sys-role-search-form');

		var valueObject = form.getForm().getValues();

		PmhTech.Ajax.request({
			url: 'sys/roles',
			method: 'GET',
			params: valueObject,
			success: this.successLoad,
			scope: this
		});
	},

	successLoad: function (resObj) {
		this.getView().down('sys-role-grid').getStore().loadRawData(resObj);
	},

	onBtnAdd : function(button){

	},
	onBtnSave : function(button){

	},
	onBtnReset : function(button){


	}
});