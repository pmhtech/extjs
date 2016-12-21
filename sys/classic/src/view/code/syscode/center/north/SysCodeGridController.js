Ext.define('SysApp.view.code.syscode.center.north.SysCodeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-grid',
    onInitMode : function(comp){

        this.getView().getStore().removeAll();
    }
});
