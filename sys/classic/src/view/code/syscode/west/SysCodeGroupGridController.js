Ext.define('SysApp.view.code.syscode.west.SysCodeGroupGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-group-grid',

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
            params : params,
            callbackScope : this
        };
        PmhTech.Utils.showPopup('sys-code-popup',options);

    },
    onBtnModify: function () {


        var record = this.getView().getSelectionModel().getSelection()[0];

        if(Ext.isEmpty(record)){
            PmhTech.Msg.alert('확인','기준정보그룹을 선택하세요');
            return false;
        }

        var options = {
            mode : 'UPDATE',
            params : record.data,
            callbackScope : this
        };
        PmhTech.Utils.showPopup('sys-code-popup',options);
    }
    
});
