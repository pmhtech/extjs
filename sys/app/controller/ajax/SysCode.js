Ext.define('SysApp.controller.ajax.SysCode', {
    extend: 'Ext.app.Controller',
    statics: {
        getUrl : function(httpMethod,paramObj,config){
            return {
                'GET' : '/sys/codes',
                'POST': Ext.String.format('/sys/codes/{1}/{2}', paramObj.PRE_CD, paramObj.CODE),
                'PUT' : Ext.String.format('/sys/codes/{1}/{2}', paramObj.PRE_CD, paramObj.CODE),
                'DELETE' : Ext.String.format('/sys/codes/{1}/{2}', paramObj.PRE_CD, paramObj.CODE)
            }
        }
    }
});