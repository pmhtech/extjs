Ext.define('SysApp.view.global.content.DefaultView', {
	extend: 'Ext.panel.Panel',
	alternateClassName: ['SysApp.view.content.DefaultView'],
	alias: ['widget.global-defaultview'],
	layout: 'fit',
	border : false,
	style : 'border-width : 0px 0px 0px 0px;background-color=red',
	plugins : [{
		ptype : 'pmh-event-wire-manager'
	}]
});