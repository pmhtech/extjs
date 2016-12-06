Ext.define('SysApp.view.sys.code.detail.form.SysCodeDetailFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-detail-form',
    onInitMode: function (comp) {
        //comp.getForm().reset();
        //comp.getForm().setReadOnlyFields(true);
    },
    onInsertMode: function (comp) {
        comp.getForm().setReadOnlyFields(false);
        comp.getForm().setReadOnlyFields(true, ['COMPANY', 'PRE_CD' ]);
    },
    onUpdateMode: function (comp) {
        comp.getForm().setReadOnlyFields(false);
        comp.getForm().setReadOnlyFields(true, ['COMPANY', 'PRE_CD','CODE']);
    }
});