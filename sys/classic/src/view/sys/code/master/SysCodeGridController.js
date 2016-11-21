Ext.define('SysApp.view.sys.code.master.SysCodeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-grid',

    onBtnSearch: function () {

        var paramObj = {
            LOCALE_CD : 'KOR'
        };
        PmhTech.Ajax.request({
            url: Ext.String.format('/sys/codes/{0}',paramObj.LOCALE_CD),
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
        var grid = this.getView().getSelectionModel().deselectAll();
        var popup = Ext.ComponentQuery.query('sys-code-popup')[0];

        if(!popup){
            popup = Ext.widget('sys-code-popup');
        }
        var paramObj = {};
        popup.showPopup('INSERT',paramObj);

    },
    onBtnUpdate: function () {
        var popup = Ext.ComponentQuery.query('sys-code-popup')[0];

        if(!popup){
            popup = Ext.widget('sys-code-popup');
        }

        var record = this.getView().getSelectionModel().getSelection()[0];

        if(!record){
            Ext.Msg.alert('확인','선택한 항목이 없습니다.');
            return false;

        }
        var paramObj = record.data;

        popup.showPopup('UPDATE',paramObj);





    },
    onBtnDelete: function () {

    }
});