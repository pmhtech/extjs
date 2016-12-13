Ext.define('SysApp.view.sys.role.sysrole.west.south.locale.SysRoleLocale', {
	extend: 'PmhTech.form.Panel',
	alias: 'widget.sys-role-locale',
	controller: 'sys-role-locale',
	layout: 'column',
	defaults: {
		columnWidth: 0.5,
		margin: '0 5 5 5'
	},
	bodyPadding: 5,
	border: false,
	items: [{
		xtype: 'pmh-combo-code',
		fieldLabel: '시스템 구분',
		name : 'SYSTEM',
		store: SysCode['SYS_000001'].copy(false),
		listeners: {
			change: 'onChangeNotify'
		}
	},{
		xtype: 'pmh-combo-code',
		fieldLabel: '메뉴권한',
		store: SysCode['SYS_000002'].copy(),
		name: 'MENU_AUTH',
		listeners: {
			change: 'onChangeNotify'
		}
	},{
		xtype : 'textfield',
		fieldLabel : '권한명',
		columnWidth : 1,
		name : 'ROLE_NM'
	},{
		xtype: 'pmhtech-radio-base',
		fieldLabel: '사용유무',
		name: 'USE_YN',
		radioItems: [{
			xtype: 'radio',
			inputValue: 'Y',
			name: 'USE_YN',
			boxLabel: '사용'
		}, {
			xtype: 'radio',
			inputValue: 'N',
			name: 'USE_YN',
			boxLabel: '미사용'
		}],
		onChangeRadioGroup: 'onChangeUSE_YN'
	},{
		xtype : 'textfield',
		hidden : true,
		name : 'ROLE_ID'
	},{
		xtype: 'textfield',
		fieldLabel: '정렬순서',
		name: 'SORT',
		listeners: {
			change: 'onChangeNotify'
		}
	},{
		xtype : 'textarea',
		fieldLabel : '메모',
		columnWidth : 1,
		name : 'MEMO'
	}]
});
