Ext.define('SysApp.view.dashboard.SiteMap', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.site_map',
    controller : 'site_map',
    listeners : {
        afterrender : 'onAfterRender'
    }
});