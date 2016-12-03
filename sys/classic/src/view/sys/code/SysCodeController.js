Ext.define('SysApp.view.sys.SysCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code',

    onSelectGrid: function (selModel, record, index) {

        var paramObj = {
            PRE_CD: record.get('PRE_CD')
        };


        PmhTech.Ajax.request({
            url: Ext.String.format('/sys/codes/{0}',  paramObj.PRE_CD),
            mode: 'GET',
            success: this.successLoad,
            scope: this
        });
    },
    successLoad: function (resObj) {

        var grid = this.getView().down('sys-code-detail-grid');
        var form = this.getView().down('sys-code-detail-form');

        var rec = this.getView().down('sys-code-grid').getSelectionModel().getSelection();

        form.getForm().setValues(rec.data);



        grid.getStore().loadRawData(resObj);
    },
    onSelectDetailGrid: function (grid, record, index) {

        var tabPanel = this.getView().down('sys-code-locale-tabpanel');
        var localeDatas = record.data.LANGUAGE;

        for(var i=0;i<localeDatas.length;i++){
            var localeData = localeDatas[i];
            var LOCALE_CD = localeData.LOCALE_CD;
            tabPanel.down('#'+LOCALE_CD).getForm().setValues(localeData);
        }
    }
});