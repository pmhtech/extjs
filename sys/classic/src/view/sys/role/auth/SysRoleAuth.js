Ext.define('SysApp.view.sys.role.auth.SysRoleAuth', {
	extend: 'SysApp.view.content.DefaultView',
	alias: 'widget.sys-role-auth',
	controller: 'sys-role-auth',
	layout: 'border',
	initComponent : function(){
		var me = this;

		Ext.apply(me,{
			items: [{
				xtype : 'sys-role-auth-grid',
				height : 250,
				onGridSelect : 'onGridSelect',
				region : 'north'
			}, {
				xtype: 'sys-role-auth-adjust',
				title: '권한설정',
				dockedItems: [{
					xtype: 'pmh-button-toolbar',
					dock: 'top',
					buttonAlign: 'right',
					btnItems: ['reset','save'],
					scope : me.getController(),
					height: 40
				}],
				collapsible: true,
				flex: 1,
				region: 'center'
			}, {
				xtype: 'sys-role-auth-preview',
				itemId : 'sysMenuPreview',
				title: '메뉴미리보기',
				flex: 1,
				region: 'south'
			}],
			listeners: {
				InitMode : 'onInitMode',
				scope : 'self'
				//	UpdateMode : 'onUpdateMode'
			}

		});

		me.callParent(arguments);


	}

});
