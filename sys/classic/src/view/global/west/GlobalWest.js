Ext.define('SysApp.view.global.west.GlobalWest', {
	extend: 'Ext.tree.Panel',
	alias: 'widget.global_west',
	controller : 'global_west',
	store : 'Navigation',
	collapsible: true,
	hideHeaders : true,
	rootVisible : false,
	root :{
		text : 'ALL',
		expanded : true
	},
	columns: [{
		xtype: 'treecolumn',
		dataIndex: 'MENU_NM',
		flex: 1
	}],listeners : {
		select : 'onSelectTree'
	}
});