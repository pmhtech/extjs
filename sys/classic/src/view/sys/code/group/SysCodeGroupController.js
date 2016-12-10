Ext.define('SysApp.view.sys.code.group.SysCodeGroupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-group',

    onBtnSearch: function (button) {

        PmhTech.Ajax.request({
            url: '/sys/codes',
            mode : 'GET',
            success: this.successLoad,
            scope : this
        });
    },
    successLoad: function (resObj) {
            var store =this.getView().getStore();
            store.loadRawData(resObj);
    },
    onBtnInsert: function () {

        this.getView().getSelectionModel().deselectAll();
        var params = {};
        var options = {
            mode : 'INSERT',
            params : params
        };
        PmhTech.Utils.showPopup('sys-code-popup',options);

    },
    onBtnModify: function () {


        var record = this.getView().getSelectionModel().getSelection()[0];
        var options = {
            mode : 'UPDATE',
            params : record.data
        };
        PmhTech.Utils.showPopup('sys-code-popup',options);
    }
});