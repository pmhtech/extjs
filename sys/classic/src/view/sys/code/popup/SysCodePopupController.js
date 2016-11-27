Ext.define('SysApp.view.sys.code.popup.SysCodePopupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-popup',

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
                xtype: 'sys-code-locale-form',
                title: title
            });
        }
        comp.add(items);

    },
    getRefData : function(params){

        var datas = [];
        for(var i=1;i<=5;i++){
            var refConfig = params['REF'+i+'_CONFIG'];

            if(Ext.isEmpty(refConfig)){
                refConfig='Y-10';

            }
            var temp= refConfig.split('-');

            var REF_EDIT_YN = temp[0];
            var REF_TYPE = temp[1];
            var REF_CD = temp[2];

            datas.push({
                'REF_FIELD': 'REF'+i,
                'REF_EDIT_YN': REF_EDIT_YN,
                'REF_TYPE': REF_TYPE,
                'REF_CD': REF_CD
            });
        }

        return datas;

    },

    initSetting: function (mode, params) {

        var thisStore = this.getView().down('grid').getStore();
        thisStore.removeAll();

        var datas = this.getRefData(params);

        thisStore.add(datas);
    }


});