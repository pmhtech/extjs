Ext.define('PmhTech.window.Base', {
    extend: 'Ext.window.Window',
    modal: true,
    width: 800,
    closable: true,
    hidden: true,
    closeAction: 'hide',
    floating: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [],
    initSetting: function (mode,params,callBackFunc,callBackScope) {
        //this.show();

        if (Ext.isFunction(callBackFunc)) {
            this.getController().callBackFunc = function () {
                Ext.callback(callBackFunc, callBackScope, arguments);
            };
        }

        this.show();
        if (mode) {
            Ext.callback(this.getController().initSetting, this.getController(), [mode, params]);
        } else {
            Ext.callback(this.getController().initSetting, this.getController(), [params]);
        }


        this.getController().mode = mode;
        this.getController().params = params;
    }
});