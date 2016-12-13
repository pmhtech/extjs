Ext.define('SysApp.view.sys.code.syscode.popup.tab.SysCodePopupTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-popup-tab',

    onAfterRenderLocale: function (comp) {


        var findIdx = SysCode['COM_000002'].find('CODE','DEFAULT');
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