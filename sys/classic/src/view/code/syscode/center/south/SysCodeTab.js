Ext.define('SysApp.view.code.syscode.center.south.SysCodeTab',{
    extend: 'Ext.tab.Panel',
    requires: ['SysApp.view.code.syscode.center.south.locale.SysCodeLocaleForm'],
    alias: 'widget.sys-code-tab',
    controller: 'sys-code-tab',
    items: [],
    deferredRender : false,
    listeners: {
        afterrender: 'onAfterRender',
        InitMode: 'onInitMode',
        UpdateMode: 'onUpdateMode',
        InsertMode: 'onInsertMode'
    }
});
