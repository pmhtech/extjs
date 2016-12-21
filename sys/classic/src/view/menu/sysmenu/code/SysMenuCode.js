Ext.define('SysApp.view.menu.sysmenu.code.SysMenuCode', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.sys-menu-code',
	controller: 'sys-menu-code',
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items : [{
		xtype : 'pmhtech-grid-base',
		itemId : 'sysMenuCode',
		storeProps :{
			rootProperty : 'sysMenuCodes'
		},
		title : '사용코드',
		flex : 1,
		style : 'border-width : 0px 1px 0px 0px',
		selModel : {
			type : 'rowmodel',
			mode : 'SIMPLE'
		},
		columns : [
			{text :'코드그룹명', dataIndex:'PRE_CD', flex : 1},
			{text :'코드명', dataIndex:'CODE_NM', flex : 1}
		],listeners : {
			storeLoad : 'onGridLoad'
		}
	}, {
		xtype : 'container',
		width : 40,
		layout : {
			type : 'vbox',
			align : 'center',
			pack : 'middle'
		},items : [
			{
				xtype : 'button',
				margin : '0 0 10 0',
				text : '>>',
				handler : 'onBtnRemoveCodes'
			},{
				xtype : 'button',
				text : '<<',
				handler : 'onBtnAddCodes'
			}
		]

	},{
		xtype : 'pmhtech-grid-base',
		itemId : 'sysCodeGroup',
		storeProps : {
			rootProperty : 'sysCodeGroups'
		},
		style : 'border-width : 0px 0px 0px 1px',
		title : '미사용 코드',
		flex : 1,
		selModel : {
			type : 'rowmodel',
			mode : 'SIMPLE'
		},
		columns : [
			{text :'코드그룹명', dataIndex:'PRE_CD', flex : 1},
			{text :'코드명', dataIndex:'CODE_NM', flex : 1}
		]
	}],listeners : {
		afterrender : 'onAfterRender',
		InitMode : 'onIntMode'
	}
});




