Ext.define('SysApp.view.sys.code.detail.tab.SysCodeDetailTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-detail-tab',

    onInitMode: function (comp) {

        var forms = comp.query('form');
        for( var i=0;i<forms.length;i++){
            var form = forms[i];
            form.getForm().reset();

            form.down('#refFields').removeAll();
            var fields =[{
                xtype: 'textfield',
                fieldLabel: '관리항목1',
                name: 'REF1'
            }, {
                xtype: 'textfield',
                fieldLabel: '관리항목2',
                name: 'REF2'
            }, {
                xtype: 'textfield',
                fieldLabel: '관리항목3',
                name: 'REF3'
            }, {
                xtype: 'textfield',
                fieldLabel: '관리항목4',
                name: 'REF4'
            }, {
                xtype: 'textfield',
                fieldLabel: '관리항목5',
                name: 'REF5'
            }];

            form.down('#refFields').add(fields);
            form.getForm().setReadOnlyFields(true);

        }

    },
    onInsertMode: function (comp) {

        var forms = comp.query('form');
        for( var i=0;i<forms.length;i++) {
            var form = forms[i];
            form.getForm().setReadOnlyFields(false, ['CODE','CODE_NM','SORT','MEMO']);
            form.getForm().setReadOnlyFields(true, ['COMPANY', 'PRE_CD' ]);
        }
    },
    onUpdateMode: function (comp) {

        var forms = comp.query('form');
        for( var i=0;i<forms.length;i++) {
            var form = forms[i];
            form.getForm().setReadOnlyFields(false, ['CODE_NM','SORT','MEMO']);
            form.getForm().setReadOnlyFields(true, ['COMPANY', 'PRE_CD','CODE']);
        }

    },

    onAfterRender: function (comp) {

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
                xtype: 'sys-code-detail-tab-locale',
                LOCALE_CD : locale,
                title: title
            });
        }
        comp.add(items);
        comp.setActiveTab(0);
    }
});