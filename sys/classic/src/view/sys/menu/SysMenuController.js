Ext.define('SysApp.view.sys.SysMenuController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-menu',

    onAfterRender: function (comp) {
        PmhTech.Ajax.request({
            url: '/sys/codes',
            method: 'GET',
            success: this.successLoad,
            scope: this
        });
    },


    onInitMode: function (comp) {
        this.onInsertMode(comp);
    },
    onInsertMode : function(comp){
        var store = comp.down('#sysCodeGroup').getStore();
        store.loadRawData(store.dataSnapShot);
        comp.down('#sysMenuCode').getStore().removeAll();
    },


    successLoad: function (resObj) {
        var store = this.getView().down('#sysCodeGroup').getStore();
        store.dataSnapShot = Ext.clone(resObj);
        store.loadRawData(resObj);

    },


    onBtnAdd: function (button) {

        var grid = this.getView().down('sys-menu-tree');
        grid.getSelectionModel().deselectAll();
        this.getView().fireEvent('InsertMode',this.getView());


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
        this.getView().down('sys-menu-tree').getController().onBtnSearch();
    },

    onBtnReset: function (button) {

    },
    onSelectTree: function (selmodel, record, index, eOpts) {

        var findIdx = SysCode['COM_000002'].find('CODE', 'DEFAULT');
        var defaultLang = SysCode['COM_000002'].getAt(findIdx).get('REF1');

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