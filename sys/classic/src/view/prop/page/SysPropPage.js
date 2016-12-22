Ext.define('SysApp.view.prop.page.SysPropPage', {
	extend: 'SysApp.view.content.DefaultView',
	alias: 'widget.sys-prop-page',
	controller: 'sys-prop-page',
	layout: 'border',
	initComponent : function(){
		var me = this;

		Ext.apply(me,{
			items: [{
				xtype: 'sys-menu-tree',
				dockedItems: [{
					xtype: 'pmh-button-toolbar',
					dock: 'top',
					buttonAlign : 'right',
					btnItems: ['search'],
					scope : me.getController()
				}],
				title: '메뉴정보',
				region: 'north',
				height: 250
			},{
				xtype : 'sys-prop-page-tab',
				flex : 1,
				region : 'center'
			}]
		});

		me.callParent(arguments);
	}

});
