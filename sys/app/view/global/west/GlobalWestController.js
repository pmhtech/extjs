Ext.define('SysApp.view.global.center.GlobalWestController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.global_west',
    onSelectTree : function(selmodel ,record ,index){
        if(record.get('leaf')===true){
            this.redirectTo(record.get('MENU_ID'));
        }
    }
});