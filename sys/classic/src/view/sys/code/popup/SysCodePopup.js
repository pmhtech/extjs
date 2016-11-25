Ext.define('SysApp.view.sys.code.popup.SysCodePopup', {
    extend: 'Ext.form.Panel',
    alias: 'widget.sys-code-popup',
    controller: 'sys-code-popup',
    modal: true,
    width: 600,
    height: 400,
    closable: true,
    hidden: true,
    closeAction: 'hide',
    title: '기준정보그룹추가',
    floating: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [{
        xtype: 'sys-code-form'
    },{
        xtype : 'tabpanel'
    }],


    showPopup: function (mode, paramObj, callBackFunc) {
        Ext.callback(this.getController().showPopup, this.getController(), arguments);
    }
});