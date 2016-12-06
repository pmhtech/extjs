Ext.define('SysApp.view.sys.SysCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code',

    onSelectGrid: function (selModel, record, index) {

        var locales = record.data.LANGUAGE;
        var localeTab = this.getView().down('sys-code-locale-tabpanel');

        for(var i=0;i<locales.length;i++){
            var locale = locales[i];
            var targetForm = localeTab.down('[LOCALE_CD='+locale.LOCALE_CD+']');

            debugger;
            for(var j=1;j<=5;j++){
                var name = 'REF'+j;
                var fields =targetForm.query('[name='+name+']');
                Ext.Array.each(fields,function(field){
                    field.setFieldLabel(locale[name]);
                });

            }
        }





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

        debugger;
        var rec = this.getView().down('sys-code-group').getSelectionModel().getSelection();

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