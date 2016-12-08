Ext.define('SysApp.view.sys.code.detail.tab.SysCodeDetailTab', {
	extend: 'Ext.tab.Panel',
	requires: ['SysApp.view.sys.code.detail.tab.locale.SysCodeDetailTabLocale'],
	alias: 'widget.sys-code-detail-tab',
	controller: 'sys-code-detail-tab',
	items: [],
	deferredRender : false,
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
		afterrender: 'onAfterRender',
		InitMode: 'onInitMode',
		UpdateMode: 'onUpdateMode',
		InsertMode: 'onInsertMode'
	}


});