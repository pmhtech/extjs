Ext.define('SysApp.view.sys.menu.tab.SysMenuTab', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.sys-menu-tab',
	controller: 'sys-menu-tab',
	deferredRender : false,
	listeners: {
		afterrender: 'onAfterRender'
	//	InitMode: 'onInitMode',
	//	UpdateMode: 'onUpdateMode',
	//	InsertMode: 'onInsertMode'
	}
});