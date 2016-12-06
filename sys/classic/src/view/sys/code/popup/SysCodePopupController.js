Ext.define('SysApp.view.sys.code.popup.SysCodePopupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-popup',

    initSetting: function (mode, params) {

        this.mode=mode;
        var thisStore = this.getView().down('grid').getStore();
        this.getView().down('#sysCodeForm').getForm().setValues(params);
        var datas = this.getRefData(params);
        thisStore.removeAll();
        thisStore.add(datas);

        var localeDatas =  params.LANGUAGE;

        var tabpanel = this.getView().down('tabpanel');

        for(var i=0;i<localeDatas.length;i++){
            var localeData = localeDatas[i];
            tabpanel.down('#'+localeData.LOCALE_CD).getForm().setValues(localeData);
        }

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
                LOCALE_CD : locale,
                itemId : locale,
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

            var REF_EDIT_YN = (temp[0]=='Y') ? true : false;
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
        var sysCodeForm = this.getView().down('sys-code-popup-form form');
        var sysCodeRef = this.getView().down('grid');



        var localeForms = this.getView().query('tabpanel form');
        var sysCodeLocales = [];
        var sysCodeGroup=sysCodeForm.getForm().getValues();


        for(var i=0;i<localeForms.length;i++){
            var valueObject = localeForms[i].getForm().getValues();
            Ext.apply(valueObject,sysCodeGroup);
            sysCodeLocales.push(valueObject);

        }

        for(var i=1;i<=5;i++){
            var rec = sysCodeRef.getStore().getAt(i-1);

            var REF_EDIT_YN = rec.get('REF_EDIT_YN')==true ? 'Y': 'N';
            var REF_TYPE = rec.get('REF_TYPE');
            var REF_CD = rec.get('REF_CD');

            var REF_CONFIG= Ext.String.format('{0}-{1}',REF_EDIT_YN,REF_TYPE);


            if(!Ext.isEmpty(REF_CD)){
                REF_CONFIG+='-'+REF_CD;
            }
            sysCodeGroup['REF'+i+'_CONFIG']= REF_CONFIG;
        }

        PmhTech.Ajax.request({
            url: Ext.String.format('/sys/codes/{0}',sysCodeGroup.PRE_CD),
            method : this.mode=='INSERT'? 'POST': 'PUT',
            params : {
                'sysCodeGroup' : Ext.encode(sysCodeGroup),
                'sysCodeLocales' : Ext.encode(sysCodeLocales)
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
        });
    },
    onBtnClose : function(button){
        var me = this;
        me.getView().hide();

    }
});