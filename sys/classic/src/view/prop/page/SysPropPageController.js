Ext.define('SysApp.view.prop.page.SysPropPageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-page',
    getEventWireDatas : function(){
return [];
    },


    onBtnSearch: function (button) {

        PmhTech.Ajax.request({
            url: '/sys/menus',
            method: 'GET',
            success: this.onLoadMenu,
            scope: this
        });
    },
    onLoadMenu: function (resObj) {


        var treeNode = PmhTech.Utils.convertListToTree(resObj['sysMenus'], 'MENU_ID', 'PRE_MENU_ID', "");
        var sysMenuTree = this.getView().down('sys-menu-tree');
        var treeStore = sysMenuTree.getStore();
        treeStore.setRoot({
            MENU_NM: '',
            text: '',
            id : '',
            expanded: true,
            children: Ext.clone(treeNode)
        });
        sysMenuTree.fireEvent('storeLoad',treeStore);
    },

    onSelectSysMenuTree:function(selmodel,record,index){


    }

});
