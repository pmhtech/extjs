Ext.define('SysApp.view.global.content.DefaultView', {
	extend: 'Ext.panel.Panel',
	alternateClassName: ['SysApp.view.content.DefaultView'],
	alias: ['widget.global-defaultview'],
	layout: 'fit',
	plugins : [{
		ptype : 'pmh-event-wire-manager'
	}]
});