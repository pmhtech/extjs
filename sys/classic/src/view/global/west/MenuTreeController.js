Ext.define('SysApp.view.global.west.MenuTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menu-tree',
    onSelectTree : function(selmodel ,record ,index){


        if(record.get('leaf')===true){
            this.redirectTo(record.get('MENU_ID'));
        }
    },
    onAfterRender : function(comp){
        var subTree =globalWest.down('#'+subMenuID);
        subTree.expand();
    }
});