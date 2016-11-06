Ext.define('SysApp.controller.AjaxUtil', {
    extend: 'Ext.app.Controller',
    statics: {
        request : function(packageName,config,httpMethod,paramObj,callbackFunc,scope){

            var url = SysApp.controller.ajax[packageName].getUrl(httpMethod,paramObj,config);
            Ext.Ajax.request({
                url : url,
                mode :httpMethod ,
                params : {
                    dataJson :Ext.encode(paramObj)
                },
                success : callbackFunc,
                scope : Ext.isEmpty(scope) ? null : scope,
                failure : function(response){

                    console.log('server-side failure with status code ' + response.status);
                }
            });
        }

    }
});



