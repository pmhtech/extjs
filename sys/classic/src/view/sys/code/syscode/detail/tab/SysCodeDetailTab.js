Ext.define('SysApp.view.sys.code.syscode.detail.tab.SysCodeDetailTab', {
	extend: 'Ext.tab.Panel',
	requires: ['SysApp.view.sys.code.syscode.detail.tab.locale.SysCodeDetailTabLocale'],
	alias: 'widget.sys-code-detail-tab',
	controller: 'sys-code-detail-tab',
	items: [],
	deferredRender : false,
	listeners: {
		afterrender: 'onAfterRender',
		InitMode: 'onInitMode',
		UpdateMode: 'onUpdateMode',
		InsertMode: 'onInsertMode'
	}
});