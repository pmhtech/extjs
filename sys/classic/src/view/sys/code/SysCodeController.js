Ext.define('SysApp.view.sys.SysCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code',

    onSelectGrid : function(selModel,record,index) {

        var paramObj = {
            LOCALE_CD: record.get('LOCALE_CD'),
            PRE_CD : record.get('PRE_CD')
        };

        PmhTech.Ajax.request({
            url: Ext.String.format('/sys/codes/{0}/{1}', paramObj.LOCALE_CD, paramObj.PRE_CD),
            mode: 'GET',
            success: this.successLoad,
            scope: this
        });
    },
    successLoad : function(resObj){

        var target = this.getView().down('sys-code-detail-grid');
        target.getStore().loadRawData(resObj);
    },
    onSelectDetailGrid :function(grid,record,index){
        var target = this.getView().down('sys-code-detail-form');
        target.getForm().setValues(record.data);
    }
});