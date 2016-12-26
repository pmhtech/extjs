Ext.define('PmhTech.window.SingleToneWindow', {
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
    initSingleTone: function (options) {


        var controller = this.getController() || this;


        var mode = options.mode;
        var configs = options.configs;
        var params = options.params;
        var callbackScope = options.callbackScope;
        var callbackFunc = options.callbackFunc;

        if (Ext.isFunction(callbackFunc)) {
            controller.callbackFunc = function () {
                Ext.callback(callbackFunc, callbackScope, arguments);
            };
        }

        this.show();
        if (mode) {
            Ext.callback(controller.initSetting, controller, [mode, params]);
        } else {
            Ext.callback(controller.initSetting, controller, [params]);
        }


        controller.mode = mode;
        controller.params = params;
        controller.configs = configs;
    }
});