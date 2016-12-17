Ext.define('SysApp.view.sys.role.auth.SysRoleAuth', {
	extend: 'SysApp.view.content.DefaultView',
	alias: 'widget.sys-role-auth',
	controller: 'sys-role-auth',
	layout: 'border',
	items: [{
		xtype : 'sys-role-auth-grid',
		height : 250,
		region : 'north'
	}, {
		xtype: 'sys-role-auth-adjust',
		title: '권한설정',
		collapsible: true,
		flex: 1,
		region: 'center'
	}, {
		xtype: 'sys-menu-tree',
		itemId : 'sysMenuPreview',
		title: '메뉴미리보기',
		flex: 1,
		region: 'south'
	}],
	listeners: {
		afterrender: 'onAfterRender',
		InitMode : 'onInitMode'
	//	UpdateMode : 'onUpdateMode'
	}
});
