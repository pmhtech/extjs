Ext.define('SysApp.view.global.center.GlobalCenterController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.global_center',

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});