Ext.define('SysApp.view.sys.role.SysRoleController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-role',

	onAfterRender: function (comp) {
		PmhTech.Ajax.request({
			url: '/sys/menus',
			method: 'GET',
			params: {
				SYSTEM: 'ALL'
			},
			success: this.successMenuLoad,
			scope: this
		});

	},
	successMenuLoad: function (resObj) {


		var treeNode = PmhTech.Utils.convertListToTree(resObj['sysMenus'], 'MENU_ID', 'PRE_MENU_ID', "");
		var treeStore = this.getView().down('sys-role-tree').getStore();
		treeStore.snapshot = Ext.clone(treeNode);
		treeStore.setRoot({
			MENU_NM: 'ALL',
			text: 'ALL',
			id: 'root',
			expanded: true,
			children: treeNode
		});
	},

	onBtnSearch: function (button) {

		PmhTech.Ajax.request({
			url: '/sys/roles',
			method: 'GET',
			success: this.successLoad,
			scope: this
		});
	},

	successLoad: function (resObj) {
		this.getView().down('sys-role-grid').getStore().loadRawData(resObj);
	},

	onSysRoleGridSelect : function(selmodel,record,index){

		var forms = this.getView().query('sys-role-locale');
		this.getView().down('sys-role-tree').getStore().rejectChanges();

		var localeData = record.data.LANGUAGE;
		for(var i=0;i<forms.length;i++){
			var form = forms[i];
			form.getForm().setValues(localeData[form.LOCALE_CD]);
		}

		PmhTech.Ajax.request({
			url : Ext.String.format('/sys/roles/{0}/{1}',record.get('SYSTEM'),record.get('ROLE_ID')),
			method : 'GET',
			success : this.onLoadSysRolePage,
			scope : this
		})
	},
	onLoadSysRolePage : function(resObj){
		var rootNode = this.getView().down('sys-role-tree').getStore().getRoot();


		var sysRolePages = resObj.sysRolePages;

		for(var i=0;i<sysRolePages.length;i++){
			var data= sysRolePages[i];
			var node = rootNode.findChild('MENU_ID', data.MENU_ID, true);
			node.set('isChecked',!Ext.isEmpty(node));
		}
	},

	onBtnAdd: function (button) {

	},

	getChecked: function (sysRole) {


		var thisStore = this.getView().down('sys-role-tree').getStore();
		var selection = [];
		thisStore.getRootNode().cascade({
			after: function (n) {
				if (!Ext.isEmpty(n.data['MENU_ID']) && n.data['isChecked'] === true) {
					selection.push({
						SYSTEM: sysRole.SYSTEM,
						ROLE_ID: sysRole.ROLE_ID,
						MENU_ID: n.data.MENU_ID
					});
				}
			}
		});
		return selection;
	},
	onBtnSave: function (button) {


		var forms = this.getView().query('tabpanel form');

		var sysRoleLocales = [];

		for (var i = 0; i < forms.length; i++) {
			var form = forms[i];
			var valueObject = form.getForm().getValues();
			sysRoleLocales.push(valueObject);
		}
		var sysRole = sysRoleLocales[0];
		var sysRolePages = this.getChecked(sysRole);

		var method = Ext.isEmpty(sysRole.ROLE_ID) ? 'POST' : 'PUT';
		var url = {
			'POST': Ext.String.format('/sys/roles/{0}', sysRole.SYSTEM),
			'PUT': Ext.String.format('/sys/roles/{0}/{1}', sysRole.SYSTEM, sysRole.ROLE_ID)
		};

		PmhTech.Ajax.request({
			url: url[method],
			method: method,
			params: {
				sysRole: Ext.encode(sysRole),
				sysRoleLocales: Ext.encode(sysRoleLocales),
				sysRolePages: Ext.encode(sysRolePages)
			},
			confirmMsg: {
				title: '확인',
				message: '저장하시겠습니까?'
			},
			success: this.onSaveCallback,
			successMsg: {
				title: '확인',
				message: '정상처리되었습니다'
			}, scope: this
		});

	},
	onSaveCallback: function (resObj) {
		this.onBtnSave();
	},
	onBtnReset: function (button) {

		var forms = this.getView().query('sys-role-locale');

		for(var i=0;i<forms.length;i++){
			var form = forms[i];
			form.getForm().reset();
		}
	}
});