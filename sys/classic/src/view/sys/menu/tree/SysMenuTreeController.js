Ext.define('SysApp.view.sys.menu.grid.SysMenuTreeController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-menu-tree',

	onBtnSearch: function (button) {

		PmhTech.Ajax.request({
			url: '/sys/menus',
			method: 'GET',
			params : {
				SYSTEM : this.getView().down('[name=SYSTEM]').getValue()
			},
			success: this.successLoad,
			scope: this
		});
	},
	successLoad: function (resObj) {


		var treeNode = PmhTech.Utils.convertListToTree(resObj['sysMenus'], 'MENU_ID', 'PRE_MENU_ID', "");
		this.getView().setRootNode({

			MENU_NM: 'sdfsdf',
			text: 'sdsfdå',
			expanded: true,
			children: treeNode
		});
	}
});