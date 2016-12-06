Ext.define('PmhTech.event.EventMap', {
    extend: 'Ext.Base',

    statics: {

        'SysAppcc.view.sys.code.SysCode' : function () {
            var codeGroupLoad = [{
                "EventType": "그룹코드로드",
                "PRE_ID": "",
                "ID": 1,
                "CompName": "sys-code-grid",
                "CompXType": "grid",
                "Event": "storeLoad",
                "CustomEvent": "",
                "Comment": "코드그룹로드"
            }, {
                "EventType": "그룹코드로드",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-code-detail-grid",
                "CompXType": "grid",
                "Event": "",
                "CustomEvent": "InitMode",
                "Comment": "코드리스트 초기화"
            }, {
                "EventType": "그룹코드로드",
                "PRE_ID": 2,
                "ID": 3,
                "CompName": "sys-code-detail-form",
                "CompXType": "form",
                "Event": "",
                "CustomEvent": "InitMode",
                "Comment": "코드상세폼 초기화"
            }];

            var codeLoad = [{
                "EventType": "코드목록로드",
                "PRE_ID": "",
                "ID": 1,
                "CompName": "sys-code-detail-grid",
                "CompXType": "grid",
                "Event": "storeLoad",
                "CustomEvent": "",
                "Comment": "코드목록로드"
            }, {
                "EventType": "코드목록로드",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-code-detail-form",
                "CompXType": "form",
                "Event": "",
                "CustomEvent": "insertMode",
                "Comment": "코드리스트 초기화"
            }];

            var codeSelect = [{
                "EventType": "코드목록선택",
                "PRE_ID": "",
                "ID": 1,
                "CompName": "sys-code-detail-grid",
                "CompXType": "grid",
                "Event": "select",
                "CustomEvent": "",
                "Comment": "코드목록선택"
            }, {
                "EventType": "코드목록선택",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-code-detail-form",
                "CompXType": "form",
                "Event": "",
                "CustomEvent": "updateMode",
                "Comment": "폼 수정모드"
            }];

            return [codeGroupLoad,codeLoad,codeSelect];
        }
    }
});