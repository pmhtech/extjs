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



    onInitMode : function(comp){

    },


    onInsertMode : function(comp){


    },
    onUpdateMode : function(comp){


    },
    onBtnAdd: function (button) {

        var grid = this.getView().down('sys-menu-tree');

        var record = grid.getSelectionModel().getSelection()[0];
        if(Ext.isEmpty(record) || record.get('MENU_LVL')==4){

            PmhTech.Msg.alert('확인','상위그룹을 선택하세요');
            return false;
        }


    },
    onBtnSave: function (button) {

    },
    onBtnReset: function (button) {

    },
    onSelectTree: function (selmodel, record, index, eOpts) {

        var forms = this.getView().query('tabpanel form');

        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            form.getForm().setValues(record.data);
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