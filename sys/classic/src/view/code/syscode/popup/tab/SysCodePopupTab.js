Ext.define('SysApp.view.code.syscode.popup.SysCodePopupTab', {
	extend: 'Ext.form.FieldSet',
	alias: 'widget.sys-code-popup-tab',
	controller: 'sys-code-popup-tab',
	collapsible: true,
	deferredRender : false,
	items: [{
		xtype: 'tabpanel',
		itemId: 'sysCodeLocale',
		listeners: {
			afterrender: 'onAfterRenderLocale'
		}
	}]
});