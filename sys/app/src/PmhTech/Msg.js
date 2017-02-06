/**
 *
 *
 *
 *
 *
 */
Ext.define('PmhTech.Msg', {
    extend: 'Ext.Base',
    statics: {

		/**
         *
         * @param title
         * @param msg
         * @param callbackFunc
         */
        alert: function (title, msg, callbackFunc) {
            Ext.Msg.alert(title, msg, function (btn) {
                if(Ext.isFunction(callbackFunc)){
                    callbackFunc();
                }
            });
        },

		/**
		 *
         * @param title
         * @param msg
         * @param callbackFunc
         */
        confirm: function (title, msg, callbackFunc) {
            var message = Ext.Msg.confirm(title, msg, function (btn) {
                if (btn == 'yes') {
                    callbackFunc();
                }
            });
            Ext.WindowMgr.bringToFront(message);
        }
    }
});