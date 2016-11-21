Ext.define('SysApp.view.sys.code.popup.SysCodePopupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-code-popup',
    callBackFunc : Ext.emptyFn,
    onAfterRender : function(comp){


        var store = SysCode['COM_000003'];
        var arrPanel = [];
        for(var i=0;i<store.getCount();i++){

            var rec = store.getAt(i);
            var code = rec.get('REF1');

            if(!code  || rec.get('CODE')=='ALL'){
                continue;
            }
            debugger;
            arrPanel.push({
                xtype : 'sys-code-locale-form',
                title : SysCode['COM_000004'].findRecord('CODE',code).get('CODE_NM')
            });
        }

        this.getView().down('tabpanel').add(arrPanel);




    },


    onAfterRenderSysCodeForm : function(comp){
        var view = this.getView();
        var store =Ext.ComponentQuery.query('sys-code-grid')[0].getStore();


        view.down('[name=REF1_CODE]').setStore(store);
        view.down('[name=REF2_CODE]').setStore(store);
        view.down('[name=REF3_CODE]').setStore(store);
        view.down('[name=REF4_CODE]').setStore(store);
        view.down('[name=REF5_CODE]').setStore(store);
    },

    setInsertMode : function(){

    },
    setUpdateMode : function(){

    },showPopup : function(mode,paramObj,callBackFunc){

        this.getView().show();


    }

});