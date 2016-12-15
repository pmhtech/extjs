Ext.define('SysApp.view.sys.code.syscode.center.north.SysCodeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-grid',
    onInitMode : function(comp){
        comp.getStore().removeAll();
    }
});
