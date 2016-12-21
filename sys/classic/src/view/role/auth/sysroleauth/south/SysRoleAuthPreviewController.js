Ext.define('SysApp.view.role.auth.sysroleauth.south.SysRoleAuthPreviewController', {
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

        this.onChangeFilter();
    }, onChangeFilter : function(field){

        var me = this.getView();
        var MENU_NM = me.down('[name=MENU_NM]').getValue();
        var MENU_AUTH = me.down('[name=MENU_AUTH]').getValue();
        var USE_YN = me.down('[name=USE_YN]').getValue();
        var ACTIVE_YN = me.down('[name=ACTIVE_YN]').getValue();



        filterFunc = function(node){

            var isEmptyMENU_NM = Ext.isEmpty(node.get('MENU_NM')) ? true : false;
            var isEmptyMENU_AUTH = MENU_AUTH =='ALL' ? true: false;
            var isEmptyUSE_YN = USE_YN =='ALL' ? true: false;
            var isEmptyACTIVE_YN = ACTIVE_YN =='ALL' ? true: false;


            var compareMENU_NM = isEmptyMENU_NM ? true : node.get('MENU_NM').search(MENU_NM)!=-1;
            var compareMENU_AUTH = isEmptyMENU_AUTH ? true : node.get('MENU_AUTH') == MENU_AUTH;
            var compareUSE_YN = isEmptyUSE_YN ? true : node.get('USE_YN')==USE_YN;
            var compareACTIVE_YN = isEmptyACTIVE_YN ? true : node.get('ACTIVE_YN')==ACTIVE_YN;
            console.log(node.get('ACTIVE_YN'));
            return compareMENU_NM && compareMENU_AUTH && compareUSE_YN && compareACTIVE_YN  &&node.isLeaf();
        };
        this.getView().filterBy(filterFunc);
    }
});
