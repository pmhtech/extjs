Ext.define('SysApp.view.global.center.GlobalCenterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.global_center',
    controller : 'global_center',
    onGlobalCenterTabChange : function(component ,newcard ,oldcard){
        this.redirectTo(newcard.menuNode.get('MENU_ID'));
    }
});