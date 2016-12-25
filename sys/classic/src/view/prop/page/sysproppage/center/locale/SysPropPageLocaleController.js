Ext.define('SysApp.view.prop.page.sysproppage.center.locale.SysPropPageLocaleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-page-locale',

    onChangePROP_TYPE : function(field,newValue,oldValue){

        var findIdx =field.getStore().find('XTYPE_NM',field.getValue());

        var PROPS = field.getStore().getAt(findIdx).data.PROPS;

        var source = Ext.decode(PROPS);
        var tempObj = {};

        for(var i=0;i<source.length;i++){
            var data = source[i];
            tempObj[data.KEY] = data.DEFAULT_VALUE;
        }

        this.getView().down('propertygrid').setSource(tempObj);



    },

    onUpdateMaster : function(thisStore , record , operation , modifiedFieldNames , details){




    }
});