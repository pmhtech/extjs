
Ext.define('SysApp.view.sys.role.sysrole.center.SysRoleTree',{
    extend: 'Ext.tree.Panel',
    alias: 'widget.sys-role-tree',
    controller: 'sys-role-tree',
    rootVisible: false,
    store : Ext.create('Ext.data.TreeStore',{
        root: {
            MENU_NM: 'All',
            text: 'ALL',
            id : 'root',
            expanded: true
        }
    }),
    columns: [
        {xtype: 'treecolumn',    text: '메뉴명',    dataIndex: 'MENU_NM',   flex: 1},
        { text: '위젯명'     , dataIndex: 'WIDGET_NM', flex: 1},
        {
            text: '메뉴권한', dataIndex: 'MENU_AUTH', flex: 1,renderer : PmhTech.Format.comboRenderer,
            editor: {
                xtype: 'pmh-combo-code', store: SysCode['SYS_000002']
            }
        }
    ]
});
