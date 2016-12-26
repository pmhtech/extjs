Ext.define('SysApp.view.prop.page.sysproppage.center.SysPropPageTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-page-tab',

    onInitMode : function(){
        var sysCodeLocales = this.getView().query('sys-prop-page-locale');
        var me = this.getView();


        me.down('pmh-button-add').setDisabled(true);
        me.down('pmh-button-save').setDisabled(true);
        me.down('pmh-button-reset').setDisabled(true);
        for(var i=0;i<sysCodeLocales.length;i++){

            sysCodeLocales[i].fireEvent('InitMode');
        }
    },
    onUpdateMode : function(selmodel,record,index){

        var sysCodeLocales = this.getView().query('sys-prop-page-locale');

        var me = this.getView();

        if(Ext.isEmpty(record.data.SHORT_NM)){
            me.down('pmh-button-add').setDisabled(true);
            me.down('pmh-button-save').setDisabled(true);
            me.down('pmh-button-reset').setDisabled(true);
        }else{
            me.down('pmh-button-add').setDisabled(false);
            me.down('pmh-button-save').setDisabled(false);
            me.down('pmh-button-reset').setDisabled(false);
        }

        for(var i=0;i<sysCodeLocales.length;i++){
            sysCodeLocales[i].fireEventArgs('UpdateMode',arguments);
        }

    },
    onAfterRender : function(comp){
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
                xtype: 'sys-prop-page-locale',
                layout : {
                    type : 'hbox',
                    align : 'stretch'
                },
                LOCALE_CD: locale,
                title: title
            });
        }
        comp.add(items);
        comp.setActiveTab(0);

        PmhTech.Ajax.request({
            url : '/sys/prop/types',
            method : 'GET',
            success : this.onLoadSysPropType,
            scope : this
        });

    },
    onLoadSysPropType : function(resObj){



        var props = this.getView().query('pmh-simple-grid [dataIndex=DOM_TYPE]');

        for(var i=0;i<props.length;i++){
            var PROP_TYPE = props[i];
            PROP_TYPE.getEditor().getStore().loadRawData(resObj);
        }
    },

    onBtnAdd : function(button){
        var me = this.getView();
        var comps = me.query('sys-prop-page-locale');

        var rec = me.up('sys-prop-page').down('sys-menu-tree').getSelection()[0];
        for(var i=0;i<comps.length;i++){

            var grid = comps[i].down('#sysPropPageLocale');

            grid.getStore().add(
                {
                    SYSTEM      : rec.get('SYSTEM'),
                    SHORT_NM    : rec.get('SHORT_NM'),
                    LOCALE_CD   : comps[i].LOCALE_CD,
                    MASTER_DOM  :rec.get('WIDGET_NM'),
                    DETAIL_DOM  : '',
                    DOM_LABEL   : '',
                    DOM_QRY     : '',
                    DOM_PROPS   : ''

                }
            );
        }
    },
    onBtnSave : function(button){

        var grids = this.getView().query('#sysPropPageLocale');

        var sysPageLocales =[];
        for(var i=0;i<grids.length;i++){
            var grid = grids[i];
            sysPageLocales =sysPageLocales.concat(grid.getSubmitData());
        }

        PmhTech.Ajax.request({
            url : Ext.String.format('/sys/prop/pages/{0}/{1}',sysPageLocales[0].SYSTEM,sysPageLocales[0].SHORT_NM),
            method : 'POST',
            params : {
                sysPageLocales :Ext.encode(sysPageLocales)
            },
            confirmMsg : {
                title : '저장',
                message : '저장하시겠습니까?'
            },
            successMsg : {
                title : '확인',
                message : '정상처리되었습니다'
            },
            success : this.onSaveCallback
        });
    },
    onSaveCallback : function(resObj){
        debugger;
    },

    onBtnReset : function(button){

    }
    
});
