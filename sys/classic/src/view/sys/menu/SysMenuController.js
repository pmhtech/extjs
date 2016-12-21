Ext.define('SysApp.view.sys.SysMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-menu',

    getEventWireDatas: function(){
        var menuLoad = [
            {
                "EventType": "메뉴리스트 입력모드",
                "PRE_ID": "",
                "ID": 1,
                "CompName": "sys-menu-tree",
                "Event": "storeLoad",
                "CustomEvent": "",
                "Comment": "코드그룹로드"
            },
            {
                "EventType": "메뉴리스트 입력모드",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-menu-tab",
                "Event": "",
                "CustomEvent": "InitMode",
                "Comment": "코드리스트 초기화"
            },
            {
                "EventType": "메뉴리스트 입력모드",
                "PRE_ID": 2,
                "ID": 3,
                "CompName": "sys-menu-code",
                "Event": "",
                "CustomEvent": "InitMode",
                "Comment": "코드상세 다국어 초기화"
            }
        ];

        var menuUpdate =[{
            "EventType": "메뉴리스트 추가",
            "PRE_ID": "",
            "ID": 1,
            "CompName": "sys-menu-tree",
            "Event": "select",
            "Comment": "코드그룹로드(selmodel,record,index)"
        },
            {
                "EventType": "다국어 메뉴탭 초기화",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-menu-tab",
                "Event": "",
                "CustomEvent": "UpdateMode",
                "Comment": "코드리스트 초기화"
            },
            {
                "EventType": "다국어 메뉴탭 초기화",
                "PRE_ID": 2,
                "ID": 3,
                "CompName": "sys-menu-code",
                "Event": "",
                "CustomEvent": "UpdateMode",
                "Comment": "코드상세 다국어 초기화"
            }];
        return [menuLoad,menuUpdate];
    },
    onAfterRender: function (comp) {
        this.onBtnSearch();
    },
    onInitMode: function (comp) {

    },


    onBtnSearch: function (button) {

        PmhTech.Ajax.request({
            url: '/sys/menus',
            method: 'GET',
            params : {
                SYSTEM : this.getView().down('[name=SYSTEM]').getValue()
            },
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
        this.refreshTreePicker(treeNode);

        sysMenuTree.fireEvent('storeLoad',treeStore);
    },
    refreshTreePicker : function(treeNode){
        var fields = this.getView().query('[name=PRE_MENU_ID]');


        for(var i=0;i<fields.length;i++){
            var field = fields[i];
            var findIdx =SysCode['COM_000005'].find('CODE','ALL_GROUP');
            field.getStore().removeAll(false);
            var tempStore =  Ext.create('Ext.data.TreeStore',{
                model : 'SysApp.model.SysMenu',
                root : {
                    MENU_ID : SysCode['COM_000005'].getAt(findIdx).get('REF2'),
                    MENU_NM : SysCode['COM_000005'].getAt(findIdx).get('REF3'),
                    id : 'ALL',
                    expanded: true,
                    children: Ext.clone(treeNode)
                }
            });
            field.setStore(tempStore);
        }

    },




    onBtnAdd: function (button) {

        var grid = this.getView().down('sys-menu-tree');
        grid.getSelectionModel().deselectAll();

        this.getView().down('sys-menu-tab').fireEvent('InitMode');


    },
    onBtnSave: function (button) {



        var mode = this.getView().down('sys-menu-tree').getSelectionModel().getSelection().length ==0 ? 'POST' : 'PUT';

        var forms = this.getView().query('tabpanel form');

        var sysMenuLocales = [];
        var sysMenu = {};
        var sysMenuCodes = [];

        for(var i=0;i<forms.length;i++){
            var valueObject = forms[i].getForm().getValues();
            sysMenuLocales.push(valueObject);
        }
        sysMenu = sysMenuLocales[0];

        var store = this.getView().down('#sysMenuCode').getStore();

        for(var i=0;i<store.getCount();i++){
            sysMenuCodes.push({
                MENU_ID : sysMenu.MENU_ID,
                PRE_CD : store.getAt(i).data.PRE_CD
            });
        }

        PmhTech.Ajax.request({
            url :Ext.String.format('/sys/menus/{0}/{1}',sysMenu.SYSTEM,sysMenu.MENU_ID),
            method : mode,
            confirmMsg : {
                title : '확인',
                message : '저장하시겠습니까?'
            },
            params : {
                sysMenu     : Ext.encode(sysMenu),
                sysMenuLocales: Ext.encode(sysMenuLocales),
                sysMenuCodes: Ext.encode(sysMenuCodes)
            },
            success : this.onSaveCallback,
            successMsg : {
                title : '확인',
                message : '정상처리되었습니다.'
            },
            scope : this
        });
    },

    onSaveCallback : function(resObj){
        this.onBtnSearch();
        this.getView().fireEvent('InsertMode',this.getView());
    },

    onBtnReset: function (button) {

    },
    onSelectTree: function (selmodel, record, index, eOpts) {

        var findIdx = SysCode['COM_000002'].find('CODE', 'DEFAULT');
        var forms = this.getView().query('tabpanel form');

        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];

            var locale = form.LOCALE_CD;
            form.getForm().setValues(record.data.LANGUAGE[locale]);
        }

        this.getView().down('#sysMenuCode').getStore().removeAll();

        var store =this.getView().down('#sysCodeGroup').getStore();
        store.loadRawData(store.dataSnapShot);

        PmhTech.Ajax.request({
            url: Ext.String.format('/sys/menus/{0}/{1}',record.get('SYSTEM'),record.get('MENU_ID')),
            method: 'GET',
            success: this.successMenuCodeLoad,
            scope: this
        });
    },
    successMenuCodeLoad : function(resObj){

        var store = this.getView().down('#sysMenuCode').getStore();
        store.loadRawData(resObj);
    }
});