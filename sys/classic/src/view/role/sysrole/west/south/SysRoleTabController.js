Ext.define('SysApp.view.role.sysrole.west.south.SysRoleTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-tab',
    onInitMode: function () {

        var me = this.getView();
        var forms = me.query('form');

        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            form.fireEvent('InitMode', form);
        }

    },
    onInsertMode: function () {

        var me = this.getView();
        var forms = me.query('form');

        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            form.fireEvent('InsertMode', form);

        }
    },
    onUpdateMode: function () {

        var me = this.getView();
        var forms = me.query('form');

        for (var i = 0; i < forms.length; i++) {
            var form = forms[i];
            form.fireEvent('UpdateMode', form);

        }
    },
    onAfterRender: function (comp) {

        var findIdx = SysCode['COM_000002'].find('CODE', 'DEFAULT');


        var defaultRec = SysCode['COM_000002'].getAt(findIdx);
        var localeStore = SysCode['COM_000003'];
        var items = [];


        for (var i = 0; i < localeStore.getCount(); i++) {
            var rec = localeStore.getAt(i);
            if (rec.get('CODE') == 'ALL') {
                continue;
            }

            var locale = rec.get('CODE');
            var title = localeStore.getAt(i).get('CODE_NM');

            if (defaultRec.get('REF1') == locale) {
                title = '<b>' + title + '(Default)</b>';
            }
            items.push({
                xtype: 'sys-role-locale',
                LOCALE_CD: locale,
                title: title
            });
        }
        comp.add(items);
        comp.setActiveTab(0);
    }
});
