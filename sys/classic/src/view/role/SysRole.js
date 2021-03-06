Ext.define('SysApp.view.role.SysRole', {
	extend: 'SysApp.view.content.DefaultView',
	alias: 'widget.sys-role',
	controller: 'sys-role',
	layout: {
		type: 'border'
	},

	initComponent : function(){
		var me = this;

		Ext.apply(me,{
			items : [{
				xtype : 'container',
				region : 'west',
				flex : 1,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},items :[{
					xtype : 'sys-role-grid',
					title : '권한 상세',
					dockedItems : [{
						xtype : 'toolbar',
						dock : 'top',
						items : [ {
							xtype: 'pmh-combo-code',
							name: 'SYSTEM',
							store: SysCode['SYS_000001'].copy(),
							value : 'ALL'
						}, {xtype : 'tbspacer',
							width : 20
						},{
							xtype: 'pmh-button-search',
							handler: 'onBtnSearch',
							scope: me.getController()
						}]
					}],
					flex : 1,
					listeners : {
						select : 'onSysRoleGridSelect'
					}
				},{
					xtype : 'sys-role-tab',
					tabBar :{
						items: [{
							xtype : 'tbfill'
						},{
							xtype: 'pmh-button-add',
							handler: 'onBtnAdd',
							scope: me.getController()
						},{
							xtype: 'pmh-button-reset',
							handler: 'onBtnReset',
							scope: me.getController()
						},{
							xtype: 'pmh-button-save',
							handler: 'onBtnSave',
							scope: me.getController()
						}]
					},
					flex : 1
				}]
			},{
				xtype : 'sys-role-page',
				collapsible : true,
				collapseDirection : 'left',
				title : '데이터 목록',
				region : 'center',
				flex : 1
			}],listeners : {
				afterrender : 'onAfterRender',
				scope: me.getController()
			}
		});
		me.callParent(arguments);
	}

});