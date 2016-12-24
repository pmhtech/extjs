Ext.define('SysApp.view.prop.type.sysproptype.center.SysPropTypeDtlGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-type-dtl-grid',
    onBtnAdd : function(button){
        this.getView().getStore().add({
            KEY : '',
            TYPE : '',
            DEFAULT_VALUE :'',
            SORT : ''
        })
    }
    
});
