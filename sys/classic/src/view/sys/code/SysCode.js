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
                "EVENT_TYPE": "InitPage",
                "EVENT_NAME": "storeLoad",
                "PRE_EVENT_ID": '',
                "EVENT_ID": '1',
                "COMPONENT": "sys-code-grid",
                "XTYPE": "grid",
                "DETAIL_EVENT_NAME": "",
                "COMMENT": "코드그룹 로드"
            }, {
                "EVENT_TYPE": "InitPage",
                "EVENT_NAME": "",
                "PRE_EVENT_ID": '1',
                "EVENT_ID": '2',
                "COMPONENT": "sys-code-detail-grid",
                "XTYPE": "grid",
                "DETAIL_EVENT_NAME": "InitMode",
                "COMMENT": "sys-code-detail-grid : 코드상세정보 초기화"
            },{
                "EVENT_TYPE": "InitPage",
                "EVENT_NAME": "",
                "PRE_EVENT_ID": '2',
                "EVENT_ID": '3',
                "COMPONENT": "sys-code-detail-form",
                "XTYPE": "form",
                "DETAIL_EVENT_NAME": "InitMode",
                "COMMENT": "sys-code-detail-form : 코드상세정보 읽기전용"
            }];

            var selectMaster = [{
                "EVENT_TYPE": "selectMaster",
                "EVENT_NAME": "storeLoad",
                "PRE_EVENT_ID": '',
                "EVENT_ID": '1',
                "COMPONENT": "sys-code-detail-grid",
                "XTYPE": "grid",
                "DETAIL_EVENT_NAME": "",
                "COMMENT": "sys-code-detail-grid :코드리스트 로드"
            }, {
                "EVENT_TYPE": "selectMaster",
                "EVENT_NAME": "",
                "PRE_EVENT_ID": '1',
                "EVENT_ID": '2',
                "COMPONENT": "sys-code-detail-form",
                "XTYPE": "form",
                "DETAIL_EVENT_NAME": "insertMode",
                "COMMENT": "sys-code-detail-form : 코드상세정보 입력모드"
            }];


            var selectDetail = [{
                "EVENT_TYPE": "selectDetail",
                "EVENT_NAME": "select",
                "PRE_EVENT_ID": '',
                "EVENT_ID": '1',
                "COMPONENT": "sys-code-detail-grid",
                "XTYPE": "grid",
                "DETAIL_EVENT_NAME": "",
                "COMMENT": "코드정보 선택"
            }, {
                "EVENT_TYPE": "selectDetail",
                "EVENT_NAME": "",
                "PRE_EVENT_ID": '1',
                "EVENT_ID": '2',
                "COMPONENT": "sys-code-detail-form",
                "XTYPE": "form",
                "DETAIL_EVENT_NAME": "updateMode",
                "COMMENT": "코드정보 수정모드"
            }];





            PmhTech.event.EventWireManager.initEvent(comp,initPageEvent);
            PmhTech.event.EventWireManager.initEvent(comp,selectMaster);
            PmhTech.event.EventWireManager.initEvent(comp,selectDetail);


        }
    }

});