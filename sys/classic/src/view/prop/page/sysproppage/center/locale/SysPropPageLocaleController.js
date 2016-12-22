Ext.define('SysApp.view.prop.page.sysproppage.center.locale.SysPropPageLocaleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-page-locale',
    onUpdateMaster : function(thisStore , record , operation , modifiedFieldNames , details){

        if(operation=Ext.data.Model.EDIT){
            var dataIndex = modifiedFieldNames[0];
            switch(dataIndex){
                case 'DOM_QRY' :
                case 'PROP_TYPE' :
                case 'PROP_VALUE' :
            }
        }


    }
});