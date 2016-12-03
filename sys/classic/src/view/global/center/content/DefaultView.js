Ext.define('SysApp.view.global.content.DefaultView', {
	extend: 'Ext.panel.Panel',
	alternateClassName: ['SysApp.view.content.DefaultView'],
	alias: ['widget.global-defaultview'],
	layout: 'fit',
	listeners: {
		afterrender: function (comp) {

			var fn = PmhTech.event.EventMap[comp.$className];

			if (Ext.isFunction(fn)) {
				var eventMap = fn();
				for (var i = 0; i < eventMap.length; i++) {
					PmhTech.event.EventWireManager.initEvent(comp, eventMap[i]);
				}
			}
		}


	}
});