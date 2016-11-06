Ext.define('PmhTech.Msg', {
    extend: 'Ext.Base',
    statics: {

        alert: function (title, msg, callbackFunc) {
            Ext.Msg.alert(title, msg, function (btn) {
                callbackFunc();
            });
        },
        confirm: function (title, msg, callbackFunc) {
            Ext.Msg.confirm(title, msg, function (btn) {
                if (btn == 'yes') {
                    callbackFunc();
                }
            });
        },

        save: function (callbackFunc, scope) {

            Ext.Msg.confirm('확인', '저장하시겠습니까?', function (btn) {
                if (btn == 'yes') {
                    callbackFunc();
                }
            });
        },
        delete: function (callbackFunc, scope) {

            Ext.Msg.confirm('확인', '삭제하시겠습니까?', function (btn) {
                if (btn == 'yes') {
                    callbackFunc();
                }
            });
        }
    }
});