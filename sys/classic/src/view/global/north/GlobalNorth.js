Ext.define('SysApp.view.global.north.GlobalNorth', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.global_north',
	controller : 'global_north',
	listeners :{
		afterrender : 'onAfterRender'
	}
	
});