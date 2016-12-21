Ext.define('SysApp.view.role.auth.sysroleauth.north.SysRoleAuthGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-auth-grid',

    onBtnSearch : function(button){
        PmhTech.Ajax.request({
            url :'/sys/codes/COM_000010',
            method : 'GET',
            success : this.onLoadSysCode,
            scope : this
        });
    },
    onLoadSysCode : function(resObj){
        this.getView().getStore().loadRawData(resObj);
    }
});
