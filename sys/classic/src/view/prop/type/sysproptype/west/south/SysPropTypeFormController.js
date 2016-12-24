Ext.define('SysApp.view.prop.type.sysproptype.west.south.locale.SysPropTypeFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-type-form',

    onInitMode : function(){
        this.getView().forceReset();
    },
    onUpdateMode : function(selmodel,record,index){
        this.getView().getForm().setValues(record.data);
    }
});
