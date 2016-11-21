Ext.define('PmhTech.util.Popup', {
    extend: 'Ext.Base',
    statics: {

        showPopup : function(widgetName,options){
            var popup = Ext.ComponentQuery.query(widgetName)[0];

            if(!popup){
                popup = Ext.widget(widgetName);
            }

            var mode;
            var params ={};
            var callBackFunc;
            var callBackScope;
            if(options){
                mode = options.mode;
                params = options.params;
                callBackFunc = options.callBackFunc;

                if(Ext.isFunction(options.callBackFunc)){
                    if(!options.callBackScope){
                        alert('SCOPE 미지정');
                    }
                }
                callBackScope = options.callBackScope;
            }
            popup.initSetting(mode,params,callBackFunc,callBackScope);

        }

    }
});
