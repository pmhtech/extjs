Ext.define('SysApp.view.prop.type.SysPropType', {
	extend: 'SysApp.view.content.DefaultView',
	alias: 'widget.sys-prop-type',
	controller: 'sys-prop-type',
	layout: {
		type: 'border',
		splitter: true
	},

	items: [{
		xtype: 'pmh-grid-base',
		title: '필드유형',
		region: 'west',
		columns: [
			{text: '컴포넌트 XType', dataIndex: 'COMP_XTYPE'},
			{text: '컴포넌트 클래스명', dataIndex: 'COMP_CLAZZ'}
		],
		flex: 1,
		dockedItems: [{
			xtype: 'pmh-button-toolbar',
			dock: 'top',
			buttonAlign: 'right',
			btnItems: ['search']
		}]
	}, {
		xtype: 'pmh-grid-base',
		region: 'center',
		plugins:[{
			ptype : 'pmh-grid-excel-editor'
		}],
		dockedItems: [{
			xtype: 'pmh-button-toolbar',
			dock: 'top',
			buttonAlign: 'right',
			btnItems: ['add','delete','save']
		}],
		columns: [
			{text: '필드속성'	, dataIndex : 'KEY'},
			{text : '타입'	, dataIndex : 'TYPE'},
			{text : '값'		, dataIndex : 'VALUE'},
			{text : '정렬순서', dataIndex : 'SORT'}

		],
		flex: 1
	}]
});
