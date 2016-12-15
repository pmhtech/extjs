Ext.define('Samjong.view.global.north.GlobalNorth', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.global-north',
	layout: {
		type: 'hbox',
		align: 'stretch',
		pack : 'end'
	},
	items : [{
		xtype : 'displayfield',
		itemId : 'logo',
		width : 200
		//value : '<a href="./index.jsp#"><img src="resources/images/heerim/logo.png" width="100%" height="45px"></a>'
	},{
		xtype : 'container',
		itemId : 'menuButtons',
		padding : '0 0 5 0',
		layout : {
			type : 'hbox',
			align : 'bottom'
		},
		defaults : {
			width : 100,
			height : 35,
			margin : '0 5 0 5'
		}
	},{
		xtype : 'container',
		padding : '0 0 5 0',
		layout: {
			type: 'hbox',
			align : 'bottom',
			pack : 'end'
		},defaults : {
			margin : '0 5 5 5'
		},
		flex : 1,
		items : []
	}]

});