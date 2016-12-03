Ext.define('SysApp.view.sys.code.master.SysCodeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-grid',

    onBtnSearch: function () {

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