
Ext.define('SysApp.view.role.sysrole.west.south.SysRoleTab',{
    extend: 'Ext.tab.Panel',
    alias: 'widget.sys-role-tab',
    controller: 'sys-role-tab',
    deferredRender : false,
    listeners: {
        afterrender: 'onAfterRender',
        InitMode: 'onInitMode',
        UpdateMode: 'onUpdateMode',
        InsertMode: 'onInsertMode'
    }
});
