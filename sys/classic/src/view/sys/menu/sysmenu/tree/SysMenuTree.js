Ext.define('SysApp.view.sys.menu.sysmenu.tree.SysMenuTree', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.sys-menu-tree',
	rootVisible: false,

	store : Ext.create('Ext.data.TreeStore',{
		model : 'SysApp.model.SysMenu',
		root: {
			MENU_NM: 'All',
			text: 'ALL',
			id : 'root',
			expanded: true
		}
	}),
	columns: [
		{xtype: 'treecolumn',    text: '메뉴명',    dataIndex: 'MENU_NM',   flex: 1},
		{ text: '클래스명'    , dataIndex: 'CLASS_NM',flex: 1},
		{ text: '위젯명'     , dataIndex: 'WIDGET_NM', flex: 1},
		{ text: '메뉴권한'   , dataIndex: 'MENU_AUTH', flex: 1 , renderer : PmhTech.Format.comboRenderer,
			editor : {
				xtype:'pmh-combo-code',
				store: SysCode['SYS_000002'].copy()
			}},
		{ text: '정렬순서'   , dataIndex: 'SORT', flex: 1},
		{ text: '사용유무'   , dataIndex: 'USE_YN',flex: 1, renderer : PmhTech.Format.comboRenderer,
			editor : {
				xtype:'pmh-combo-code',
				store: SysCode['COM_000011'].copy()
			}}
	]
});




