Ext.define('SysApp.view.sys.code.detail.tab.locale.SysCodeDetailTabLocale', {
	extend: 'PmhTech.form.Panel',
	alias: 'widget.sys-code-detail-tab-locale',
	controller: 'sys-code-detail-tab-locale',
	layout: 'column',
	defaults: {
		columnWidth: 0.5,
		margin: '0 5 5 5'
	},
	bodyPadding: 5,
	border: false,
	items: [{
		xtype: 'textfield',
		fieldLabel: '코드그룹',
		hidden: true,
		name: 'PRE_CD'
	}, {
		xtype: 'textfield',
		fieldLabel: '언어설정',
		hidden: true,
		name: 'LOCALE_CD',
		displayField: 'CODE_NM',
		valueField: 'CODE'
	}, {
		xtype: 'pmh-combo-code',
		fieldLabel: '법인구분',
		store: SysCode['COM_000001'].copy(false),
		name: 'COMPANY',
		listeners: {
			change: 'onChangeNotify'
		}
	}, {
		xtype: 'textfield',
		fieldLabel: '코드',
		name: 'CODE',
		listeners: {
			change: 'onChangeNotify'
		}
	}, {
		xtype: 'textfield',
		fieldLabel: '코드명',
		columnWidth: 1,
		name: 'CODE_NM'
	}, {
		xtype: 'fieldset',
		margin: 0,
		padding: 0,
		border: false,
		layout: 'column',
		itemId: 'refFields',
		columnWidth: 1,
		defaults: {
			margin: ' 5 5 5 0',
			columnWidth: 0.5
		},
		items: [{
			xtype: 'textfield',
			fieldLabel: '관리항목1',
			name: 'REF1'
		}, {
			xtype: 'textfield',
			fieldLabel: '관리항목2',
			name: 'REF2'
		}, {
			xtype: 'textfield',
			fieldLabel: '관리항목3',
			name: 'REF3'
		}, {
			xtype: 'textfield',
			fieldLabel: '관리항목4',
			name: 'REF4'
		}, {
			xtype: 'textfield',
			fieldLabel: '관리항목5',
			name: 'REF5'
		}]
	}, {
		xtype: 'textarea',
		name: 'MEMO',
		fieldLabel: '메모',
		columnWidth: 1,
		height: 100

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
	}, {
		xtype: 'textfield',
		fieldLabel: '정렬순서',
		name: 'SORT',
		listeners: {
			change: 'onChangeNotify'
		}
	}],
	listeners: {
		InitMode: 'onInitMode',
		UpdateMode: 'onUpdateMode',
		InsertMode: 'onInsertMode'
	}
});