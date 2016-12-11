Ext.define('PmhTech.Msg', {
    extend: 'Ext.Base',
    statics: {

        alert: function (title, msg, callbackFunc) {
            Ext.Msg.alert(title, msg, function (btn) {
                if(Ext.isFunction(callbackFunc)){
                    callbackFunc();
                }
            });
        },
        confirm: function (title, msg, callbackFunc) {
            var message = Ext.Msg.confirm(title, msg, function (btn) {
                if (btn == 'yes') {
                    callbackFunc();
                }
            });
            Ext.WindowMgr.bringToFront(message);
        },

        save: function (callbackFunc, scope) {

            var message = Ext.Msg.confirm('확인', '저장하시겠습니까?', function (btn) {
                if (btn == 'yes') {
                    callbackFunc();
                }
            });
            Ext.WindowMgr.bringToFront(message);
        },
        delete: function (callbackFunc, scope) {

            var message = Ext.Msg.confirm('확인', '삭제하시겠습니까?', function (btn) {
                if (btn == 'yes') {
                    callbackFunc();
                }
            });
            Ext.WindowMgr.bringToFront(message);
        }
    }
});