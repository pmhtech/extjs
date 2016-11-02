Ext.define('SysApp.view.sys.code.SysCodeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys_code',
    onLoadMasterData : function(){

    },
    onLoadDetailData : function(){

    },
    actionSysCodeDetail : function(){


    },
    actionSysCode : function(httpMethod,paramObj,callbackFunc){

        var urlMap ={
            'GET' : '/sys/codes',
            'POST': Ext.String.format('/sys/codes/{1}/{2}', paramObj.PRE_CD, paramObj.CODE),
            'PUT' : Ext.String.format('/sys/codes/{1}/{2}', paramObj.PRE_CD, paramObj.CODE),
            'DELETE' : Ext.String.format('/sys/codes/{1}/{2}', paramObj.PRE_CD, paramObj.CODE)
        };

        Ext.Ajax.request({
            url : urlMap[httpMethod],
            mode :httpMethod ,
            params : Ext.encode(paramObj),
            success : callbackFunc
        });
    },

    setInputMode : function(mode){


    },showPopup : function(){

    }

});