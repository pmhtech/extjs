Ext.define('SysApp.view.sys.role.auth.sysroleauth.south.SysRoleAuthPreviewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-auth-preview',

    onAfterRender: function (button) {

        PmhTech.Ajax.request({


            url: '/sys/menus',
            method: 'GET',
            params : {
                SYSTEM : 'ALL'
            },
            success: this.onLoadSysMenu,
            scope: this
        });
    },
    onLoadSysMenu: function (resObj) {


        var treeNode = PmhTech.Utils.convertListToTree(resObj['sysMenus'], 'MENU_ID', 'PRE_MENU_ID', "");

        var me = this.getView();
        var treeStore = me.getStore();

        me.snapshot = Ext.clone(treeNode);

        treeStore.setRoot({
            MENU_NM: 'ALL',
            text: 'ALL',
            id : 'root',
            expanded: true,
            children: treeNode
        });

    },
    onInitMode : function(){

        var me = this.getView();
        var treeStore = this.getView().getStore();
        treeStore.setRoot({
            MENU_NM: 'ALL',
            text: 'ALL',
            id : 'root',
            expanded: true,
            children: Ext.clone(me.snapshot)
        });

    }
});
