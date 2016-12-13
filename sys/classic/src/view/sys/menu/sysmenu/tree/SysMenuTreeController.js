Ext.define('SysApp.view.sys.menu.sysmenu.tree.SysMenuTreeController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-menu-tree',

	onAfterRender : function(comp){
		this.onBtnSearch();
	},

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
		var copyTreeNode = Ext.clone(treeNode);
		var treeStore = this.getView().getStore();



		treeStore.setRoot({
			MENU_NM: 'ALL',
			text: 'ALL',
			id : 'root',
			expanded: true,
			children: treeNode
		});
		var fields = this.getView().up('sys-menu').query('[name=PRE_MENU_ID]');

		for(var i=0;i<fields.length;i++){
			var field = fields[i];
			var findIdx =SysCode['COM_000005'].find('CODE','ALL_GROUP');

			field.setStore(
				Ext.create('Ext.data.TreeStore',{
					root : {
						MENU_ID : SysCode['COM_000005'].getAt(findIdx).get('REF2'),
						MENU_NM : SysCode['COM_000005'].getAt(findIdx).get('REF3'),
						id : 'ALL',
						expanded: true,
						children: copyTreeNode
					}
				})
			);
		}

		this.getView().fireEvent('InitMode',this.getView());
	}
});