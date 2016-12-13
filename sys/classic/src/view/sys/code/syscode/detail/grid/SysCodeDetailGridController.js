Ext.define('SysApp.view.sys.code.syscode.detail.grid.SysCodeDetailGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-detail-grid',
    onInitMode : function(comp){
      comp.getStore().removeAll();
    }
});