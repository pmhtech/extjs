Ext.define('SysApp.view.sys.code.SysCodeGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys_code_grid',
    onBtnInsertHandler : function(button){

        var popup = Ext.ComponentQuery.query('sys_code_window')[0];

        if(Ext.isEmpty(popup)){
            popup = Ext.widget('sys_code_window');
        }
        popup.show();


    }

});