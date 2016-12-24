Ext.define('SysApp.view.prop.type.SysPropType', {
	extend: 'SysApp.view.content.DefaultView',
	alias: 'widget.sys-prop-type',
	controller: 'sys-prop-type',
	layout: {
		type: 'border'
	},
	defaults : {
		split: true
	},
	initComponent : function() {
		var me = this;
		Ext.apply(me,{
			items: [{
				xtype : 'panel',
				flex : 1,
				region : 'west',
				layout: {
					type: 'border'
				},
				defaults : {
					split: true
				},items : [{
					xtype : 'sys-prop-type-grid',
					title : '필드항목',
					region : 'north'
				},{
					xtype : 'sys-prop-type-form',
					title : '필드상세',
					region : 'center',
					dockedItems: [{
						xtype: 'pmh-button-toolbar',
						dock: 'top',
						buttonAlign: 'right',
						btnItems: ['add','save','reset'],
						scope : me.getController()
					}]
				}]
			}, {
				xtype: 'sys-prop-type-dtl-grid',
				title : '필드속성',
				region: 'center',
				flex: 1,
				listeners : {
					containermouseout  : 'onMouseOut',
					scope : me.getController()
				}
			}]

		});

		me.callParent(arguments);


	}

});
