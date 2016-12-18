Ext.define('SysApp.view.sys.role.sysrole.center.SysRoleTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.sys-role-page',
	controller: 'sys-role-page',
	rootVisible: false,
	plugins: [{
		ptype: 'pmh-treefilter'
		, collapseOnClear: false
		, allowParentFolders: true
	},{
		ptype : 'pmh-treechecker',
		dataIndex : 'isChecked',
		includeParent : true
	}],
	store: Ext.create('Ext.data.TreeStore', {
		fields: [
			{	name: 'isChecked', type: 'boolean', defaultValue: false }
		],
		root: {
			MENU_NM: 'All',
			text: 'ALL',
			id: 'root',
			expanded: true
		}
	}),
	dockedItems: [{
		xtype: 'toolbar',
		defaults : {
			labelWidth : 50,
			width : 140,
			margin : '0 30 0 0'
		},
		dock: 'top',
		items: [{
			xtype: 'textfield',
			fieldLabel: '메뉴명',
			name: 'MENU_NM',
			listeners: {
				change: 'onChangeFilter'
			}
		}, {
			xtype: 'pmh-combo-code',
			store: SysCode['SYS_000002'].copy(),
			fieldLabel: '메뉴권한',
			name: 'MENU_AUTH',
			value: 'ALL',
			listeners: {
				change: 'onChangeFilter'
			}
		}, {
			xtype: 'pmh-combo-code',
			store: SysCode['COM_000011'].copy(),
			fieldLabel: '사용유무',
			name: 'USE_YN',
			value: 'ALL',
			listeners: {
				change: 'onChangeFilter'
			}
		}]
	}],
	columns: [
		{
			xtype: 'checkcolumn', text: '사용', dataIndex: 'isChecked', width: 40

		},
		{xtype: 'treecolumn', text: '메뉴명', dataIndex: 'MENU_NM', flex: 1},
		{text: '위젯명', dataIndex: 'WIDGET_NM', flex: 1},

		{
			text: '메뉴권한', dataIndex: 'MENU_AUTH', flex: 1, renderer: PmhTech.Format.comboRenderer,
			editor: {
				xtype: 'pmh-combo-code', store: SysCode['SYS_000002']
			}
		}
	],
	viewConfig: {
		markDirty :false,
		getRowClass: function (record, rowIndex, rowParams, store) {
			return record.get("isChecked") ? "row-checked" : "";
		}
	},listeners : {
		InitMode :'onInitMode'
	}
});
