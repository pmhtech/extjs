Ext.define('SysApp.view.sys.code.SysCodeWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys_code_window',
    onBtnInsertHandler : function(button){

        var popup = Ext.ComponentQuery.query('sys_code_form_window')[0];

        if(Ext.isEmpty(popup)){
            popup = Ext.widget('sys_code_form_window');
        }
        popup.show();


    }

});