Ext.define('SysApp.view.sys.code.detail.SysCodeLocaleForm', {
	extend: 'Ext.tab.Panel',
	requires: ['SysApp.view.sys.code.detail.SysCodeDetailForm'],
	alias: 'widget.sys-code-locale-tabpanel',
	controller: 'sys-code-locale-tabpanel',
	items: [],
	tabBar :{
		items: [{
			xtype : 'tbfill'
		},{
			xtype: 'pmh-button-add',
			handler: 'onBtnAdd'
		},{
			xtype: 'pmh-button-reset',
			handler: 'onBtnReset'
		},{
			xtype: 'pmh-button-save',
			handler: 'onBtnSave'
		}]
	},
	listeners: {
		afterrender: 'onAfterRender'
	}


});