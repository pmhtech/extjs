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
		sysCodeName: 'COM_000001',
		name: 'COMPANY'
	}, {
		xtype: 'textfield',
		fieldLabel: '코드',
		name: 'CODE'
	}, {
		xtype: 'textfield',
		fieldLabel: '코드명',
		columnWidth: 1,
		name: 'CODE_NM'
	}, {
		xtype: 'textfield',
		fieldLabel: '관리항목1',
		name: 'REF1'
	}, {
		xtype: 'pmh-combo-code',
		fieldLabel: '관리항목1',
		disabled: true,
		hidden: true,
		name: 'REF1'
	}, {
		xtype: 'textfield',
		fieldLabel: '관리항목2',
		name: 'REF2'
	}, {
		xtype: 'pmh-combo-code',
		fieldLabel: '관리항목2',
		disabled: true,
		hidden: true,
		name: 'REF2'
	}, {
		xtype: 'textfield',
		fieldLabel: '관리항목3',
		name: 'REF3'
	}, {
		xtype: 'pmh-combo-code',
		fieldLabel: '관리항목3',
		disabled: true,
		hidden: true,
		name: 'REF3'
	}, {
		xtype: 'textfield',
		fieldLabel: '관리항목4',
		name: 'REF4'
	}, {
		xtype: 'pmh-combo-code',
		fieldLabel: '관리항목4',
		disabled: true,
		hidden: true,
		name: 'REF4'
	}, {
		xtype: 'textfield',
		fieldLabel: '관리항목5',
		name: 'REF5'
	}, {
		xtype: 'pmh-combo-code',
		fieldLabel: '관리항목5',
		disabled: true,
		hidden: true,
		name: 'REF5'
	}, {
		xtype: 'pmhtech-radio-base',
		fieldLabel: '사용유무',
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
		}]
	}, {
		xtype : 'textarea',
		fieldLabel : '메모',
		columnWidth : 1,
		height : 100

	},{
		xtype: 'textfield',
		fieldLabel: '정렬순서',
		name: 'SORT'
	}], listeners: {
		InitMode: 'onInitMode',
		UpdateMode: 'onUpdateMode',
		InsertMode: 'onInsertMode'
	}


});