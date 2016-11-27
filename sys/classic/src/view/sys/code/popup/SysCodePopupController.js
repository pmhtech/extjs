Ext.define('SysApp.view.sys.code.popup.SysCodePopupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-popup',

    initSetting: function (mode, params) {

        this.mode=mode;
        var thisStore = this.getView().down('grid').getStore();
        thisStore.removeAll();

        var datas = this.getRefData(params);

        thisStore.add(datas);
    },

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
        comp.setActiveTab(0);

    },
    getRefData : function(params){

        var datas = [];
        for(var i=1;i<=5;i++){
            var refConfig = params['REF'+i+'_CONFIG'];

            if(Ext.isEmpty(refConfig)){
                refConfig='Y-10';

            }
            var temp= refConfig.split('-');

            var REF_EDIT_YN = temp[0]=='Y' ? true : false;
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
    onBtnSave : function(button){
        var sysCodeForm = this.getView().down('sys-code-form form');
        var sysCodeRef = this.getView().down('grid');
        var sysCodeLocale = this.getView().query('tabpanel form');


        var sysCodeGroup=sysCodeForm.getForm().getValues();


        for(var i=1;i<=5;i++){
            var rec = sysCodeRef.getStore().getAt(i-1);

            var REF_EDIT_YN = rec.get('REF_EDIT_YN');
            var REF_TYPE = rec.get('REF_TYPE')==true ? 'Y': 'N';
            var REF_CD = rec.get('REF_CD');

            var REF_CONFIG= Ext.String.format('{0}-{1}',REF_EDIT_YN,REF_TYPE);


            if(!Ext.isEmpty(REF_CD)){
                REF_CONFIG+='-'+REF_CD;
            }
            sysCodeGroup['REF'+i+'_CONFIG']= REF_CONFIG;

        }


        var sysCode = sysCodeForm.getForm().getValues();
        var sysCodeLocale = sysCodeForm.getForm().getValues();



        PmhTech.Ajax.request({
            url: '/sys/codes',
            mode : 'GET',
            params : {
                'sysCodeGroup' : Ext.encode(sysCodeGroup),
                'listSysCodeLocale' : Ext.encode(listSysCodeLocale),
            },
            confirmMsg :{
                title : '확인',
                message : '저장하시겠습니까?'
            },
            success: this.successLoad,
            scope : this
        });

    },
    successLoad : function(resObj){

        var me = this.getView();
        Ext.Msg.alert('확인','정상처리되었습니다.',function(btn){

            me.hide();

        })


    }


});