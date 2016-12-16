Ext.define('SysApp.view.sys.code.SysCode', {
	extend: 'SysApp.view.content.DefaultView',
	alias: 'widget.sys-code',
	layout: 'border',
	requires: ['SysApp.view.sys.code.syscode.popup.SysCodePopup'],
	controller: 'sys-code',

	initComponent: function () {
		var me = this;

		Ext.apply(me, {
			items: [{
				title: '코드그룹목록 ',
				xtype: 'sys-code-group-grid',
				region: 'west',
				flex: 1,
				onGridSelect: 'onSelectGrid'
			}, {
				xtype: 'container',
				region: 'center',
				flex: 1,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items: [{
					xtype: 'sys-code-grid',
					title: '코드목록',
					layout: 'fit',
					height : 250,
					onGridSelect: 'onSelectDetailGrid'
				}, {
					xtype: 'sys-code-tab',
					flex: 1,
					layout: 'fit',
					frame: true,
					tabBar: {
						items: [{
							xtype: 'tbfill'
						}, {
							xtype: 'pmh-button-add',
							handler: 'onBtnAdd',
							scope: me.getController()
						}, {
							xtype: 'pmh-button-reset',
							handler: 'onBtnReset',
							scope: me.getController()
						}, {
							xtype: 'pmh-button-save',
							handler: 'onBtnSave',
							scope: me.getController()
						}]
					}
				}]
			}]
		});
		me.callParent(arguments);


	}
});