Ext.define('SysApp.view.role.auth.sysroleauth.center.SysRoleAuthAdjust', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.sys-role-auth-adjust',
	controller: 'sys-role-auth-adjust',
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'sys-role-grid',
		title: '정의된 권한',
		storeProps : {
			rootProperty : 'sysRoleAuths'
		},
		itemId: 'sysRoleAuth',
		flex: 1,
		listeners : {
			storeLoad :'onGridLoad',
			storeRemove : 'onGridChange',
			storeAdd :'onGridChange'
		}
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
		afterrender : 'onAfterRender',
		InitMode : 'onInitMode',
		updateMode : 'onUpdateMode'
	}
});
