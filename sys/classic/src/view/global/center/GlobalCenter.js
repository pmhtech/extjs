Ext.define('SysApp.view.global.center.GlobalCenter', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.global_center',
  layout : 'fit',
  controller : 'global_center',

  items :[{
    xtype : 'tabpanel',
    defaults: {
      bodyPadding: 10,
      scrollable: true,
      closable: true,
      border: false
    },
    listeners : {
      tabchange : 'onGlobalCenterTabChange'
    }
  }]

});