Ext.define('SysApp.view.sys.menu.code.SysMenuCode', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.sys-menu-code',
	controller: 'sys-menu-code',
	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items : [{
		xtype : 'pmhtech-grid-base',
		itemId : 'sysMapCodes',
		title : '사용코드',
		dockedItems : [{
			xtype : 'toolbar',
			dock : 'top',
			items : [{
				xtype : 'textfield',
				fieldLabel : '검색'
			}]
		}],
		hideHeaders : true,
		flex : 1,
		style : 'border-width : 0px 1px 0px 0px',
		columns : [
			{text :'기준정보', dataIndex:'PRE_CD', flex : 1,renderer : function(value,metaData,record){
				return record.get('PRE_CD')+'['+record.get('CODE_NM')+']';
			}}
		]
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
				text : '>>'
			},{
				xtype : 'button',

				text : '<<'
			}
		]

	},{
		xtype : 'pmhtech-grid-base',
		itemId : 'sysCodeGroups',
		storeProps : {
			rootProperty : 'sysCodeGroups'
		},
		style : 'border-width : 0px 0px 0px 1px',
		title : '미사용 코드',
		dockedItems : [{
			xtype : 'toolbar',
			dock : 'top',
			items : [{
				xtype : 'textfield',
				fieldLabel : '검색'
			}]
		}],
		flex : 1,
		hideHeaders : true,
		columns : [
			{text :'기준정보', dataIndex:'PRE_CD', flex : 1,renderer : function(value,metaData,record){
				return '['+record.get('PRE_CD')+']&nbsp;&nbsp;&nbsp;&nbsp;'+record.get('CODE_NM')+'';
			}}
		]
	}]
});




