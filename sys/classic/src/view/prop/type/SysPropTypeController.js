Ext.define('SysApp.view.prop.type.SysPropTypeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-prop-type',

    getEventWireDatas : function(){
        var dataLoad = [
            {
                "EventType": "그룹코드로드",
                "PRE_ID": "",
                "ID": 1,
                "CompName": "sys-prop-type-grid",
                "Event": "storeLoad",
                "CustomEvent": "",
                "Comment": "코드그룹로드"
            },
            {
                "EventType": "그룹코드로드",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-prop-type-form",
                "Event": "",
                "CustomEvent": "InitMode",
                "Comment": "코드리스트 초기화"
            },
            {
                "EventType": "그룹코드로드",
                "PRE_ID": 2,
                "ID": 3,
                "CompName": "sys-prop-type-dtl-grid",
                "Event": "",
                "CustomEvent": "InitMode",
                "Comment": "코드상세 다국어 초기화"
            }
        ];


        var sysroleSelect = [{
            "EventType": "코드목록로드",
            "PRE_ID": "",
            "ID": 1,
            "CompName": "sys-prop-type-grid",
            "Event": "select",
            "CustomEvent": "",
            "Comment": "코드선택"
        }, {
            "EventType": "코드목록로드",
            "PRE_ID": 1,
            "ID": 2,
            "CompName": "sys-prop-type-form",
            "Event": "",
            "CustomEvent": "UpdateMode",
            "Comment": "코드리스트 초기화"
        },{
            "EventType": "그룹코드로드",
            "PRE_ID": 2,
            "ID": 3,
            "CompName": "sys-prop-type-dtl-grid",
            "Event": "",
            "CustomEvent": "UpdateMode",
            "Comment": "코드상세 다국어 초기화"
        }];
        return [dataLoad,sysroleSelect];

    },


    onBtnAdd : function(button){

        this.getView().down('sys-prop-type-grid').getSelectionModel().deselectAll();
        this.getView().down('form').forceReset();
        this.getView().down('form').fireEvent('InitMode');
    },
    onBtnSave : function(button){

        this.setProps();
        var valueObject = this.getView().down('form').getValues();
        var method = this.getView().down('sys-prop-type-grid').getHttpMethod();

        PmhTech.Ajax.request({
            url : Ext.String.format('/sys/prop/types/{0}',valueObject.XTYPE_NM),
            method : method,
            params : {
                sysPropType :Ext.encode(valueObject)
            },
            confirmMsg : {
                title : '저장',
                message : '저장하시겠습니까'
            },
            successMsg : {
                title : '저장',
                message : '정상처리되었습니다.'
            },
            success :  this.onSaveSysPropType,
            scope : this
        })


    },
    onSaveSysPropType :function(resObj){
        this.getView().down('sys-prop-type-grid').getController().onBtnSearch();

    },
    onBtnReset : function(button){
        var form = this.getView().down('form');

        form.getForm().reset();


        var PROPS = form.getValues().PROPS;
        var datas = [];
        if(PROPS.length>0){
            datas = Ext.decode(PROPS);
        }
        this.getView().down('sys-prop-type-dtl-grid').getStore().loadData(datas);

    },
    setProps : function(view){

        var form = this.getView().down('form');
        var grid = this.getView().down('sys-prop-type-dtl-grid');
        var datas =grid.getSubmitData();
        form.down('[name=PROPS]').setValue(Ext.encode(datas));
    }
});