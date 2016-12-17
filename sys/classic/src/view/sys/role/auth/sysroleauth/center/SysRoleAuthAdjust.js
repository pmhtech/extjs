Ext.define('SysApp.view.sys.role.auth.sysroleauth.center.SysRoleAuthAdjust', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.sys-role-auth-adjust',
	controller: 'sys-role-auth-adjust',

	dockedItems: [{
		xtype: 'pmh-button-toolbar',
		dock: 'top',
		buttonAlign: 'right',
		btnItems: ['reset','save'],
		height: 40
	}],

	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'sys-role-grid',
		title: '정의된 권한',
		itemId: 'sysRoleAuth',
		flex: 1,
		onGridLoad : 'onGridLoad'
	}, {
		xtype: 'container',
		width: 40,
		layout: {
			type: 'vbox',
			align: 'center',
			pack: 'middle'
		}, items: [{
			xtype: 'button',
			margin: '0 0 10 0',
			text: '>>',
			handler: 'onBtnRemoveCodes'
		}, {
			xtype: 'button',
			text: '<<',
			handler: 'onBtnAddCodes'
		}]
	}, {
		xtype: 'sys-role-grid',
		title: '미정의된 권한',
		itemId: 'sysRoleGrid',
		flex: 1
	}],
	listeners : {
		InitMode : 'onInitMode'
	}
});
