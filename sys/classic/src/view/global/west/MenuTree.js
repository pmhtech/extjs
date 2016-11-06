Ext.define('SysApp.view.global.west.MenuTree', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.menu-tree',
    controller : 'menu-tree',
    height : 400,
    collapsible: true,
    hideHeaders: true,
    rootVisible: false,
    columns: [{
        xtype: 'treecolumn',
        dataIndex: 'MENU_NM',
        renderer : function(value,metaData){
            metaData.align="";
            return value;
        },
        flex: 1
    }], listeners: {
        select: 'onSelectTree'
    }
});