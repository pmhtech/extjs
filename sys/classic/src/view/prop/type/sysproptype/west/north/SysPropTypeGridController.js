Ext.define('SysApp.view.prop.type.sysproptype.west.north.SysPropTypeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-type-grid',

    onBtnSearch : function(button){

        PmhTech.Ajax.request({
            url : '/sys/prop/types',
            method : 'GET',
            success : this.onLoadSysPropType,
            scope : this
        });
    },
    onLoadSysPropType : function(resObj){
        this.getView().getStore().loadRawData(resObj);
    }
});
