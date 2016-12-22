Ext.define('SysApp.view.code.syscode.center.south.SysCodeTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-tab',

    onInitMode: function () {

        var me = this.getView();


        me.down('pmh-button-add').setDisabled(true);
        me.down('pmh-button-save').setDisabled(true);
        me.down('pmh-button-reset').setDisabled(true);


        var forms = me.query('form');
        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            form.fireEventArgs('InitMode',arguments);
        }

    },
    onInsertMode: function (selmodel,record,index) {

        var me = this.getView();


        me.down('pmh-button-add').setDisabled(false);
        me.down('pmh-button-save').setDisabled(false);
        me.down('pmh-button-reset').setDisabled(false);



        var forms = me.query('form');
        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            form.fireEventArgs('InsertMode',arguments);

        }
    },
    onUpdateMode: function () {


        var forms = this.getView().query('form');
        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            form.fireEventArgs('UpdateMode',arguments);

        }

    },
    onAfterRender: function (comp) {

        var localeStore = SysCode['COM_000003'];
        var items = [];


        var defaultLanguage = PmhTech.Utils.getDefaultLanguage();

        for (var i = 0; i < localeStore.getCount(); i++) {
            var rec = localeStore.getAt(i);
            if (rec.get('CODE') == 'ALL') {
                continue;
            }

            var locale = rec.get('CODE');
            var title = localeStore.getAt(i).get('CODE_NM');

            if (defaultLanguage == locale) {
                title = '<b>' + title + '(Default)</b>';
            }
            items.push({
                xtype: 'sys-code-locale-form',
                LOCALE_CD: locale,
                title: title
            });
        }
        comp.add(items);
        comp.setActiveTab(0);
    }
});