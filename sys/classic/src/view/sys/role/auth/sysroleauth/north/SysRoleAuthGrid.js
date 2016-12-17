Ext.define('SysApp.view.sys.role.auth.sysroleauth.north.SysRoleAuthGrid', {
	extend: 'PmhTech.grid.Base',
	alias: 'widget.sys-role-auth-grid',
	controller : 'sys-role-auth-grid',
	dockedItems: [{
		xtype: 'pmh-button-toolbar',
		dock: 'top',
		buttonAlign: 'right',
		btnItems: ['search'],
		height: 40
	}],
	title: '권한코드',
	height: 250,
	region: 'north',
	storeProps: {
		rootProperty: 'sysCodes'
	},
	columns: [
		{text: '사용자 권한코드', dataIndex: 'PRE_CD', flex: 1},
		{text: '사용자 권한명', dataIndex: 'CODE_NM', flex: 1},
		{text: '사용유무', dataIndex: 'USE_YN', flex: 1},
		{text: '정렬순서', dataIndex: 'SORT', flex: 1}
	]
});
