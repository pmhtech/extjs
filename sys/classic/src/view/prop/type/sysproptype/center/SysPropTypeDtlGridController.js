Ext.define('SysApp.view.prop.type.sysproptype.center.SysPropTypeDtlGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-type-dtl-grid',
    onInitMode : function(){
        this.getView().getStore().removeAll();
    },
    onUpdateMode : function(selmodel,record,index){
        var gridStore = this.getView().getStore();

        var PROPS = record.data.PROPS;
        var datas = [];
        if(Ext.isString(PROPS)){
            datas = Ext.decode(PROPS);
        }
        gridStore.loadData(datas);
    },
    onBtnAdd : function(button){
        this.getView().getStore().add({
            KEY : '',
            TYPE : '',
            DEFAULT_VALUE :'',
            SORT : ''
        });
    },onBtnDelete : function(button){

        var grid = this.getView();

        var records = grid.getCheckedRecord();


        grid.getStore().remove(records);

    }
});
