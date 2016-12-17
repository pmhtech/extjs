Ext.define('SysApp.view.sys.role.auth.SysRoleAuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-auth',

    onAfterRender : function(comp){
        PmhTech.Ajax.request({
            url :'/sys/roles',
            method : 'GET',
            success : this.onLoadSysRole,
            scope : this
        });
    },
    onLoadSysRole : function(resObj){
        var me = this.getView();
        me.down('#sysRoleGrid').snapshot = resObj;
        me.down('#sysRoleGrid').getStore().loadRawData(resObj);
    },
    onInitMode: function(){
        var me = this.getView();


        //sysMenuPreView.getStore().removeAll();

    },
    onUpdateMode :function(){

    }







});
