
Ext.define('SysApp.view.role.auth.sysroleauth.south.SysRoleAuthPreview',{
    extend: 'Ext.tree.Panel',
    alias : 'widget.sys-role-auth-preview',
    controller: 'sys-role-auth-preview',
    rootVisible: false,
    plugins: [{
        ptype: 'pmh-treefilter'
        , collapseOnClear: false
        , allowParentFolders: true
    }],
    store: Ext.create('Ext.data.TreeStore', {
        model : 'SysApp.model.SysMenu',
        root: {
            MENU_NM: 'All',
            text: 'ALL',
            id: 'root',
            expanded: true
        }
    }),
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            xtype: 'textfield',
            fieldLabel: '메뉴명',
            name: 'MENU_NM',
            listeners: {
                change: 'onChangeFilter'
            }
        }, {
            xtype: 'pmh-combo-code',
            store: SysCode['SYS_000002'].copy(),
            fieldLabel: '메뉴권한',
            name: 'MENU_AUTH',
            value: 'ALL',
            listeners: {
                change: 'onChangeFilter'
            }
        }, {
            xtype: 'pmh-combo-code',
            store: SysCode['COM_000011'].copy(),
            fieldLabel: '사용유무',
            name: 'USE_YN',
            value: 'ALL',
            listeners: {
                change: 'onChangeFilter'
            }
        }, {
            xtype: 'pmh-combo-code',
            store: SysCode['COM_000011'].copy(),
            fieldLabel: '활성화유무',
            name: 'ACTIVE_YN',
            value: 'ALL',
            listeners: {
                change: 'onChangeFilter'
            }
        }]
    }],
    columns: [
        {xtype: 'treecolumn', text: '메뉴명', dataIndex: 'MENU_NM', flex: 1},
        {text: '위젯명', dataIndex: 'WIDGET_NM', flex: 1},
        {
            text: '메뉴권한', dataIndex: 'MENU_AUTH', flex: 1, renderer: PmhTech.Format.comboRenderer,
            editor: {
                xtype: 'pmh-combo-code', store: SysCode['SYS_000002']
            }
        },{
            text : '메뉴활성화' ,dataIndex : 'ACTIVE_YN'
        }
    ],
    viewConfig: {
        markDirty :false,
        getRowClass: function (record, rowIndex, rowParams, store) {
            return record.get("isChecked") ? "row-checked" : "";
        }
    },listeners : {
        afterrender : 'onAfterRender',
        InitMode :'onInitMode',
        UpdateMode : 'onUpdateMode'
    }
});
