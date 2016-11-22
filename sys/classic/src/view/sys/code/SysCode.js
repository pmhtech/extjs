Ext.define('SysApp.view.sys.code.SysCode', {
    extend: 'SysApp.view.content.HBoxDefaultView',

    alias: 'widget.sys-code',
    controller: 'sys-code',

    leftItems: [{
        xtype: 'sys-code-grid',
        reference: 'sys-code-grid',
        title: '코드그룹목록 ',
        onGridSelect: 'onSelectGrid',
        onStoreLoad : function(store){
            console.log('DEFAULT');
        }
    }],
    rightItems: [{
        xtype: 'sys-code-detail-grid',
        title: '코드목록',
        flex: 1,
        onGridSelect: 'onSelectDetailGrid'
    }, {
        xtype: 'sys-code-detail-form',
        title: '코드상세',
        flex: 3
    }], listeners: {
        afterrender: function (comp) {


            var initPageEvent = [{
                "EventType": "InitPage",
                "Event": "storeLoad",
                "PRE_ID": '',
                "ID": '1',
                "CompName": "sys-code-grid",
                "CompXType": "grid",
                "CustomEvent": "",
                "COMMENT": "코드그룹 로드"
            }, {
                "EventType": "InitPage",
                "Event": "",
                "PRE_ID": '1',
                "ID": '2',
                "CompName": "sys-code-detail-grid",
                "CompXType": "grid",
                "CustomEvent": "InitMode",
                "COMMENT": "sys-code-detail-grid : 코드상세정보 초기화"
            },{
                "EventType": "InitPage",
                "Event": "",
                "PRE_ID": '2',
                "ID": '3',
                "CompName": "sys-code-detail-form",
                "CompXType": "form",
                "CustomEvent": "InitMode",
                "COMMENT": "sys-code-detail-form : 코드상세정보 읽기전용"
            }];

            var selectMaster = [{
                "EventType": "selectMaster",
                "Event": "storeLoad",
                "PRE_ID": '',
                "ID": '1',
                "CompName": "sys-code-detail-grid",
                "CompXType": "grid",
                "CustomEvent": "",
                "COMMENT": "sys-code-detail-grid :코드리스트 로드"
            }, {
                "EventType": "selectMaster",
                "Event": "",
                "PRE_ID": '1',
                "ID": '2',
                "CompName": "sys-code-detail-form",
                "CompXType": "form",
                "CustomEvent": "insertMode",
                "COMMENT": "sys-code-detail-form : 코드상세정보 입력모드"
            }];


            var selectDetail = [{
                "EventType": "selectDetail",
                "Event": "select",
                "PRE_ID": '',
                "ID": '1',
                "CompName": "sys-code-detail-grid",
                "CompXType": "grid",
                "CustomEvent": "",
                "COMMENT": "코드정보 선택"
            }, {
                "EventType": "selectDetail",
                "Event": "",
                "PRE_ID": '1',
                "ID": '2',
                "CompName": "sys-code-detail-form",
                "CompXType": "form",
                "CustomEvent": "updateMode",
                "COMMENT": "코드정보 수정모드"
            }];





            PmhTech.event.EventWireManager.initEvent(comp,initPageEvent);
            PmhTech.event.EventWireManager.initEvent(comp,selectMaster);
            PmhTech.event.EventWireManager.initEvent(comp,selectDetail);


        }
    }

});