Ext.define('SysApp.view.sys.menu.tab.locale.SysMenuTabLocale', {
	extend: 'PmhTech.form.Panel',
	alias: 'widget.sys-menu-tab-locale',
	controller: 'sys-menu-tab-locale',
	layout: 'column',
	defaults: {
		columnWidth: 0.5,
		margin: '0 5 5 5'
	},
	bodyPadding: 5,
	border: false,
	items: [{
		xtype: 'pmh-combo-code',
		fieldLabel: '시스템구분',
		store: SysCode['SYS_000001'].copy(false),
		name: 'SYSTEM',
		listeners: {
			change: 'onChangeNotify'
		}
	}, {
		xtype: 'textfield',
		fieldLabel: '메뉴권한',
		name: 'MENU_AUTH'
	},{
		xtype: 'textfield',
		fieldLabel: '상위메뉴ID',
		name: 'PRE_MENU_ID',
		listeners: {
			change: 'onChangeNotify'
		}
	}, {
		xtype: 'textfield',
		fieldLabel: '메뉴ID',
		name: 'MENU_ID',
		listeners: {
			change: 'onChangeNotify'
		}
	},   {
		xtype: 'textfield',
		fieldLabel: '메뉴명',
		name: 'MENU_NM'
	},  {
		xtype: 'textfield',
		fieldLabel: '위젯명',
		name: 'WIDGET_NM'
	},{
		xtype: 'textfield',
		fieldLabel: '클래스명',
		columnWidth : 1,
		name: 'CLASS_NM'
	},{
		xtype: 'textfield',
		fieldLabel: '메뉴레벨',
		name: 'MENU_LVL'
	},  {
		xtype: 'textfield',
		fieldLabel: '정렬',
		name: 'SORT'
	}, {
		xtype: 'textfield',
		fieldLabel: '정렬',
		name: 'MEMO'
	}, {
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
	}],
	listeners: {
		InitMode: 'onInitMode',
		UpdateMode: 'onUpdateMode',
		InsertMode: 'onInsertMode'
	}
});