Ext.define('SysApp.view.sys.code.popup.SysCodePopupTab', {
	extend: 'Ext.form.FieldSet',
	alias: 'widget.sys-code-popup-tab',
	controller: 'sys-code-popup-tab',
	collapsible: true,

	items: [{
		xtype: 'tabpanel',
		itemId: 'sysCodeLocale',
		listeners: {
			afterrender: 'onAfterRenderLocale'
		}
	}]
});