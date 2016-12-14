Ext.define('SysApp.view.sys.role.sysrole.center.SysRoleTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.sys-role-tree',
	controller: 'sys-role-tree',
	rootVisible: false,
	plugins: [{
		ptype: 'pmh-treefilter'
		, collapseOnClear: false
		, allowParentFolders: true
	}],
	store: Ext.create('Ext.data.TreeStore', {
		root: {
			MENU_NM: 'All',
			text: 'ALL',
			id: 'root',
			expanded: true
		}
	}),
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		items: [{
			xtype: 'textfield',
			fieldLabel : '메뉴명',
			name : 'MENU_NM',
			listeners: {
				change: 'onChangeFilter'
			}
		}, {
			xtype: 'pmh-combo-code',
			store: SysCode['SYS_000002'].copy(),
			fieldLabel: '메뉴권한',
			name : 'MENU_AUTH',
			value : 'ALL',
			listeners: {
				change: 'onChangeFilter'
			}
		}]
	}],
	columns: [
		{xtype: 'treecolumn', text: '메뉴명', dataIndex: 'MENU_NM', flex: 1},
		{text: '위젯명', dataIndex: 'WIDGET_NM', flex: 1},
		{
			text: '메뉴권한', dataIndex: 'MENU_AUTH', flex: 1, renderer: PmhTech.Format.comboRenderer,
			editor: {
				xtype: 'pmh-combo-code', store: SysCode['SYS_000002']
			}
		}
	]
});
