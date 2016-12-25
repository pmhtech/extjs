Ext.define('SysApp.view.prop.page.sysproppage.center.SysPropPageTabController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-page-tab',

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



        var props = this.getView().query('pmh-grid-base [dataIndex=DOM_TYPE]');

        for(var i=0;i<props.length;i++){
            var PROP_TYPE = props[i];
            PROP_TYPE.getEditor().getStore().loadRawData(resObj);
            debugger;
        }
    },

    onBtnAdd : function(button){
        var me = this.getView();
        var grids = me.query('#fieldProperty');

        for(var i=0;i<grids.length;i++){

            grids[i].getStore().add(
                {
                    COMP_NAME :'',
                    DOM_QRY :'',
                    PROP_TYPE :'',
                    PROP_VALUE :''
                }
            );
        }
    },
    onBtnSave : function(button){

    },
    onBtnReset : function(button){

    }
    
});
