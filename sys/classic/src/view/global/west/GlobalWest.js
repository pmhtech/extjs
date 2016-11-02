Ext.define('SysApp.view.global.west.GlobalWest', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.global_west',
	collapsible: true,
	split: {width : 5},
	splitterResize: false,
	overflowY: true,
	initComponent: function () {
		var me = this;

		Ext.apply(me, {

			items: [{
				xtype: 'panel',
				ui: 'side-menu-item',
				defaults: {
					padding: '0 15 0 15'
				},
				padding: '0 0 15 0',
				border: false,
				bodyStyle: 'background-color:#5E728',
				title: '<span role="presentation"  class="fa fa-user"></span>&nbsp;&nbsp;WelCome',
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				overflowY: true,
				items: [{
					xtype: 'button',
					ui: 'side-menu-item-user',
					text: '<table><tr><td style="text-align:left"> <span role="presentation"  class="fa fa-user"></span>&nbsp;&nbsp;&nbsp; 사용자명  </td></tr></table> ',
					margin: '0 10 0 10',
					border: false
				}]
			}],
			listeners: {
				expand: function (comp) {
					Ext.ComponentQuery.query('#sktButton')[0].setWidth(comp.getWidth());
				},
				collapse: function (comp) {
					Ext.ComponentQuery.query('#sktButton')[0].setWidth(39);
				}
			}
		});
		me.callParent(arguments);

	}
});