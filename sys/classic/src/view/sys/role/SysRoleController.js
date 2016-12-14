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

	getChecked: function () {

		var thisStore = this.getView().down('sys-role-tree').getStore();
		var selection = [];
		thisStore.getRootNode().cascadeBy(function (n) {
			if (n.data['isChecked'] === true) {
				selection.push(n);
			}
		});
		return selection;
	},
	onBtnSave : function(button){


		var forms = this.getView().query('tabpanel form');

		var sysRoleLocales=[];

		for(var i=0;i<forms.length;i++){
			var form = forms[i];
			var valueObject = form.getForm().getValues();
			sysRoleLocales.push(valueObject);
		}
		var sysRole= sysRoleLocales[0];


		var method = Ext.isEmpty(sysRole.ROLE_ID) ? 'POST' : 'PUT';
		var url ={
			'POST' :Ext.String.format('/sys/roles/{0}',sysRole.SYSTEM),
			'PUT' :Ext.String.format('/sys/roles/{0}/{1}',sysRole.SYSTEM,sysRole.ROLE_ID)
		};

		var sysRolePages = this.getChecked();

		PmhTech.Ajax.request({
			url : url[method],
			method : method,
			params : {
				sysRole : Ext.encode(sysRole),
				sysRoleLocales : Ext.encode(sysRoleLocales),
				sysRolePages : Ext.encode(sysRolePages)
			},
			confirmMsg : {
				title : '확인',
				message : '저장하시겠습니까?'
			},
			success : this.onSaveCallback,
			successMsg : {
				title :'확인',
				message :'정상처리되었습니다'
			},scope : this
		});

	},
	onSaveCallback : function(resObj){


		alert(111);
	},
	onBtnReset : function(button){


	}
});