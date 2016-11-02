Ext.define('SysApp.controller.LoginController',{
    extend : 'Ext.app.Controller',
    statics : {
        isLogin : function(){

            var userId = 'Test';
            debugger;
            Ext.Ajax.request({
                url : PmhTech.serverUrl+'/users/'+userId+'/login',
                method : 'POST',
                callback :function( options, success, response ) {
                    debugger;
                    // gets called, but success is false, response content does not contain any data
                }

            });

            return true;

        }



    }
});