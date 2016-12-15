Ext.define('SysApp.view.sys.role.sysrole.west.north.SysRoleGrid', {
	extend: 'PmhTech.grid.Base',
	alias: 'widget.sys-role-grid',
	controller: 'sys-role-grid',
	storeProps: {
		fields: ['COMPANY', 'PRE_CD', 'CODE', 'CODE_NM', 'REF1', 'REF2', 'REF3', 'REF4', 'REF5', 'USE_YN', 'MEMO'],
		rootProperty: 'sysRoles'
	},
	columns: [
		{
			text: '회사코드',
			dataIndex: 'SYSTEM',
			editor: {xtype: 'pmh-combo-code', store: SysCode['SYS_000001']},
			renderer: PmhTech.Format.comboRenderer
		},
		{text: 'Role ID', dataIndex: 'ROLE_ID'},
		{text: 'Role 명', dataIndex: 'ROLE_NM'},
		{text: '사용유무', dataIndex: 'USE_YN'},
		{text: '정렬순서', dataIndex: 'SORT'}
	]
});
