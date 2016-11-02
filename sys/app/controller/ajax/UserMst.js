Ext.define('SysApp.controller.ajax.UserMst', {
    extend: 'Ext.app.Controller',
    statics: {
        getUrl : function(httpMethod,paramObj,config){
            return this.getProperty(httpMethod,config,paramObj);
        },
        getProperty : function(httpMethod,config,paramObj){
            var urlMap ={
                'DEFAULT' : {
                    'GET' : '/users',
                    'POST': Ext.String.format('/users/{0}', paramObj.USER_ID),
                    'PUT' : Ext.String.format('/users/{0}', paramObj.USER_ID),
                    'DELETE' : Ext.String.format('/users/{0}', paramObj.USER_ID)

                },'LOGIN':{
                    'POST' : Ext.String.format('/auth/login/{0}', paramObj.USER_ID)
                },'LOGOUT':{
                    'POST' : Ext.String.format('/auth/{0}/logout', paramObj.USER_ID)
                }
            };

            return urlMap[config][httpMethod];

        }
    }
});