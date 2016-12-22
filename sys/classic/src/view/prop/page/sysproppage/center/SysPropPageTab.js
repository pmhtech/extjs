
Ext.define('SysApp.view.prop.page.sysproppage.center.SysPropPageTab',{
    extend: 'Ext.tab.Panel',
    alias : 'widget.sys-prop-page-tab',
    requires : ['SysApp.view.prop.page.sysproppage.center.locale.SysPropPageLocale'],
    controller: 'sys-prop-page-tab',
    deferredRender : false,
    tabBar: {
        items: [{
            xtype: 'tbfill'
        }, {
            xtype: 'pmh-button-add',
            handler: 'onBtnAdd'
        }, {
            xtype: 'pmh-button-reset',
            handler: 'onBtnReset'
        }, {
            xtype: 'pmh-button-save',
            handler: 'onBtnSave'
        }]
    },

    listeners : {
        afterrender :'onAfterRender'
    }
});
