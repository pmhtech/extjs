Ext.define('SysApp.view.prop.page.SysPropPageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-page',
    getEventWireDatas : function(){
        var dataLoad = [
            {
                "EventType": "그룹코드로드",
                "PRE_ID": "",
                "ID": 1,
                "CompName": "sys-menu-tree",
                "Event": "storeLoad",
                "CustomEvent": "",
                "Comment": "코드그룹로드"
            },
            {
                "EventType": "그룹코드로드",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-prop-page-tab",
                "Event": "",
                "CustomEvent": "InitMode",
                "Comment": "코드리스트 초기화"
            }
        ];


        var sysMenuSelect = [{
            "EventType": "코드목록로드",
            "PRE_ID": "",
            "ID": 1,
            "CompName": "sys-menu-tree",
            "Event": "select",
            "CustomEvent": "",
            "Comment": "코드선택"
        }, {
            "EventType": "코드목록로드",
            "PRE_ID": 1,
            "ID": 2,
            "CompName": "sys-prop-page-tab",
            "Event": "",
            "CustomEvent": "UpdateMode",
            "Comment": "코드리스트 초기화"
        }];
        return [dataLoad,sysMenuSelect];
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

        var SYSTEM = record.data.SYSTEM;
        var SHORT_NM = record.data.SHORT_NM;

        if(Ext.isEmpty(SHORT_NM)){
            return false;
        }


        PmhTech.Ajax.request({
            url : Ext.String.format('/sys/prop/pages/{0}/{1}',SYSTEM,SHORT_NM),
            method : 'GET',
            success: this.onLoadSysPropPage,
            scope : this
        });
    },

    onLoadSysPropPage :function(resObj){

        var localeList = [];

        for(var i=0;i<SysCode['COM_000003'].getCount();i++){
            var rec = SysCode['COM_000003'].getAt(i);

            if(rec.data.CODE!='ALL'){
                localeList.push(rec.data.CODE);
            }

        }



        for(var i=0;i<localeList.length;i++){
            var LOCALE_CD = localeList[i];
            var store = this.getView().down('sys-prop-page-tab [LOCALE_CD='+LOCALE_CD+'] #sysPropPageLocale').getStore();
            var rootProperty = store.getProxy().getReader().getRootProperty();
            var data = resObj[rootProperty][LOCALE_CD];
            store.loadData(Ext.isEmpty(data) ?[] : data);
        }
    }

});
