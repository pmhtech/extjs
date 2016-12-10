Ext.define('SysApp.view.sys.menu.grid.SysMenuTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.sys-menu-tree',
	controller: 'sys-menu-tree',
	rootVisible: false,
	dockedItems: [{
		xtype: 'toolbar',
		dock: 'top',
		items: [
			{
				xtype: 'pmh-combo-code',
				name: 'SYSTEM',
				store: SysCode['SYS_000001'].copy(false)
			}, {
				xtype: 'pmh-button-search',
				handler: 'onBtnSearch'
			}

		]

	}],
	root: {
		MENU_NM: 'All',
		text: 'ALL',
		expanded: true
	},
	columns: [{
		xtype: 'treecolumn',
		text: '메뉴명',
		dataIndex: 'MENU_NM',
		flex: 1
	}, {

		text: '클래스명',
		dataIndex: 'CLASS_NM',
		flex: 1
	}, {

		text: '위젯명',
		dataIndex: 'WIDGET_NM',
		flex: 1
	}, {

		text: '메뉴권한',
		dataIndex: 'MENU_AUTH',
		flex: 1
	}, {
		text: '클래스명',
		dataIndex: 'SORT',
		flex: 1
	}, {
		text: '사용유무',
		dataIndex: 'USE_YN',
		flex: 1
	}]
});




