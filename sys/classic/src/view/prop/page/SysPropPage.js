
Ext.define('SysApp.view.prop.page.SysPropPage',{
    extend: 'SysApp.view.content.DefaultView',
    alias : 'widget.sys-prop-page',
    controller: 'sys-prop-page',
    layout : 'border',
    items : [{
        xtype : 'sys-menu-tree',
        title : '메뉴정보',
        region : 'north',
        height : 180
    }]
});
