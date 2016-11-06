Ext.define('SysApp.view.sys.SysCodeGridController', {
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
            debugger;

    },
    onBtnInsert: function () {
        var popup = Ext.ComponentQuery.query('sys-code-window')[0];

        if(!popup){
            popup = Ext.widget('sys-code-window');
        }
        popup.showPopup(mode,paramObj,callBackFunc);

    },
    onBtnUpdate: function () {

    },
    onBtnDelete: function () {

    }
});