Ext.define('SysApp.view.sys.code.popup.tab.SysCodePopupTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-popup-tab',

    onAfterRenderLocale: function (comp) {


        var store = SysCode['COM_000003'];
        var localeStore = SysCode['COM_000004'];
        var items = [];

        for (var i = 0; i < store.getCount(); i++) {
            var rec = store.getAt(i);

            if (rec.get('CODE') == 'ALL') {
                continue;
            }

            var locale = rec.get('REF1');
            var findIdx = localeStore.find('CODE', locale);

            var title = localeStore.getAt(findIdx).get('CODE_NM');

            if (rec.get('CODE') == 'DEFAULT') {
                title = '<b>' + title + '(Default)</b>';
            }
            items.push({
                xtype: 'sys-code-popup-tab-locale',
                LOCALE_CD : locale,
                itemId : locale,
                title: title
            });
        }
        comp.add(items);
        comp.setActiveTab(0);

    }
});