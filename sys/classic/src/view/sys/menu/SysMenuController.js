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
    successLoad: function (resObj) {
        var store = this.getView().down('#sysCodeGroups').getStore();
        store.loadRawData(resObj);
    },


    onBtnAdd: function (button) {

        var grid = this.getView().down('sys-menu-tree');
        grid.getSelectionModel().deselectAll();
        grid.fireEvent('InsertMode',grid);


    },
    onBtnSave: function (button) {

    },
    onBtnReset: function (button) {

    },
    onSelectTree: function (selmodel, record, index, eOpts) {

        this.getView().down('#sysMapCodes').getStore().removeAll();

        var findIdx = SysCode['COM_000002'].find('CODE', 'DEFAULT');

        var defaultLang = SysCode['COM_000002'].getAt(findIdx).get('REF1');




        var forms = this.getView().query('tabpanel form');

        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];

            var locale = form.LOCALE_CD;
            form.getForm().setValues(record.data.LANGUAGE[locale]);
        }


        PmhTech.Ajax.request({
            url: Ext.String.format('/sys/menus/{0}/{1}',record.get('SYSTEM'),record.get('MENU_ID')),
            method: 'GET',
            success: this.successMenuCodeLoad,
            scope: this
        });
    },
    successMenuCodeLoad : function(resObj){

        var store = this.getView().down('#sysMapCodes').getStore();
        store.loadRawData(resObj);

    }
});