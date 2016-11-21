Ext.define('SysApp.view.sys.code.detail.SysCodeDetailFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-detail-form',
    onInitMode: function (comp) {
        comp.getForm().reset();
        comp.getForm().setReadOnlyFields(true);
    },
    onInsertMode: function (comp) {
        comp.getForm().setReadOnlyFields(false);
        comp.getForm().setReadOnlyFields(true, ['COMPANY', 'PRE_CD' ]);
    },
    onUpdateMode: function (comp) {
        comp.getForm().setReadOnlyFields(false);
        comp.getForm().setReadOnlyFields(true, ['COMPANY', 'PRE_CD','CODE']);
    },
    onBtnSearch: function () {

        var paramObj = {
            LOCALE_CD: 'KOR'
        };
        PmhTech.Ajax.request({
            url: Ext.String.format('/sys/codes/{0}', paramObj.LOCALE_CD),
            mode: 'GET',
            success: this.successMasterLoad,
            scope: this
        });
    },
    successLoad: function (resObj) {
        var store = this.getView().getStore();
        store.loadRawData(resObj);

    },
    onBtnInsert: function () {
        var grid = this.getView().getSelectionModel().deselectAll();
        var popup = Ext.ComponentQuery.query('sys-code-window')[0];

        if (!popup) {
            popup = Ext.widget('sys-code-window');
        }
        var paramObj = {};
        popup.showPopup('INSERT', paramObj);

    },
    onBtnUpdate: function () {
        var popup = Ext.ComponentQuery.query('sys-code-window')[0];

        if (!popup) {
            popup = Ext.widget('sys-code-window');
        }

        var record = this.getView().getSelectionModel().getSelection()[0];

        if (!record) {
            Ext.Msg.alert('확인', '선택한 항목이 없습니다.');
            return false;

        }
        var paramObj = record.data;
        popup.showPopup('UPDATE', paramObj);

    },
    onBtnDelete: function () {

    }
});