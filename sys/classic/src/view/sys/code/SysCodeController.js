Ext.define('SysApp.view.sys.SysCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code',

    onSelectGrid: function (selModel, record, index) {

        var locales = record.data.LANGUAGE;
        var localeTab = this.getView().down('sys-code-detail-tab');


        var findIdx = SysCode['COM_000003'].find('CODE','DEFAULT');

        var defaultLang = SysCode['COM_000003'].getAt(findIdx).get('REF1');


        for(var i=0;i<locales.length;i++){
            var locale = locales[i];
            var targetForm = localeTab.down('[LOCALE_CD='+locale.LOCALE_CD+']');

            for(var j=1;j<=5;j++){
                var name = 'REF'+j;

                var config = record.data[name+'_CONFIG'].split('-');

                var EDIT_YN = config[0];
                var FIELD_TYPE = config[1];
                var comboStore = config[2];



                var fields =targetForm.query('[name='+name+']');

                Ext.Array.each(fields,function(field){


                    if(locale.LOCALE_CD!=defaultLang && EDIT_YN=='N'){
                        field.setReadOnly(true);
                    }else{
                        field.setReadOnly(false);
                    }

                    var isComboBox = field.getXTypes().search('combobox')!=-1;
                    var isVisibleCombo = !Ext.isEmpty(comboStore);

                    if(isVisibleCombo){

                        if(isComboBox){
                            field.setVisible(true);
                            field.bindStore(SysCode[comboStore].copy(false));
                            field.setDisabled(false);
                        }else{
                            field.setVisible(false);
                            field.setDisabled(true);
                        }
                    }else{
                        if(isComboBox){
                            field.setVisible(false);
                            field.setDisabled(true);
                        }else{
                            field.setVisible(true);
                            field.setDisabled(false);
                        }
                    }
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
        var form = this.getView().down('sys-code-detail-tab-locale');

        var rec = this.getView().down('sys-code-group').getSelectionModel().getSelection();
        form.getForm().setValues(rec.data);

        grid.getStore().loadRawData(resObj);
    },
    onSelectDetailGrid: function (grid, record, index) {

        var tabPanel = this.getView().down('sys-code-detail-tab');
        var localeDatas = record.data.LANGUAGE;

        for(var i=0;i<localeDatas.length;i++){
            var localeData = localeDatas[i];
            var LOCALE_CD = localeData.LOCALE_CD;
            tabPanel.down('[LOCALE_CD='+LOCALE_CD+']').getForm().setValues(localeData);
        }
    }
});