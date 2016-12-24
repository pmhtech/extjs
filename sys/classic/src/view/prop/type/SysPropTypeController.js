Ext.define('SysApp.view.prop.type.SysPropTypeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-type',

    onBtnAdd : function(button){

        this.getView().down('sys-prop-type-grid').getSelectionModel().deselectAll();
        this.getView().down('form').forceReset();
    },
    onBtnSave : function(button){

        var valueObject = this.getView().down('form').getValues();

        var method = valueObject.XTYPE_NM ? 'POST' : 'PUT';

        var url = {
            POST :'/sys/prop/types',
            PUT :Ext.format.String('/sys/prop/types/{0}',valueObject.XTYPE_NM)
        };




        PmhTech.Ajax.request({
            url : url[method],
            params : {
                sysPropType : 'sysPropType'
            },success :  this.onSaveSysPropType
        })


    },
    onSaveSysPropType :function(resObj){
      this.getView().down('pmh-button-search').handler();

    },
    onBtnReset : function(button){


    },
    onMouseOut : function(view){

        var me = this.getView();
        var grid = view.grid;
        var isDirty =grid.getStore().getModifiedRecords().length!=0;
        if(isDirty){

            var datas =grid.getSubmitData();
            me.down('form [name=PROPS]').setValue(Ext.encode(datas));
            grid.getStore().commitChanges();

        }
    }
});