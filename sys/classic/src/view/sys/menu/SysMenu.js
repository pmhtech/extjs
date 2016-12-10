Ext.define('SysApp.view.sys.menu.SysMenu', {
	extend: 'SysApp.view.content.DefaultView',
	alias: 'widget.sys-menu',
	controller: 'sys-menu',
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	initComponent: function () {

		var me = this;
		Ext.apply(me, {
			items: [{
				xtype: 'sys-menu-tree',
				height : 300,
				listeners: {
					select: 'onSelectTree',
					scope: this.getController()
				}
			}, {
				xtype: 'container',
				height: 300,
				layout: {
					type: 'hbox',
					align: 'stretch'
				}, items: [{
					xtype: 'sys-menu-tab',
					flex: 1
				}, {
					xtype: 'panel',
					title: '기준정보 코드',
					flex: 1
				}]

			}
			]
		});
		me.callParent(arguments);

	}


});