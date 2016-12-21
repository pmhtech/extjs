Ext.define('SysApp.view.menu.sysmenu.tab.SysMenuTab', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.sys-menu-tab',
	controller: 'sys-menu-tab',
	deferredRender : false,
	listeners: {
		afterrender: 'onAfterRender',
		InitMode: 'onInitMode',
		UpdateMode: 'onUpdateMode'
	}
});