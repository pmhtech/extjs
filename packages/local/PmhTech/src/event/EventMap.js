Ext.define('PmhTech.event.EventMap', {
    extend: 'Ext.Base',

    statics: {
        'SysApp.view.sys.menu.SysMenu': function(){
            var menuLoad = [
                {
                    "EventType": "메뉴리스트조회",
                    "PRE_ID": "",
                    "ID": 1,
                    "CompName": "sys-menu-tree",
                    "CompXType": "treepanel",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드그룹로드"
                },
                {
                    "EventType": "다국어 메뉴탭 초기화",
                    "PRE_ID": 1,
                    "ID": 2,
                    "CompName": "sys-menu-tab",
                    "CompXType": "tabpanel",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드리스트 초기화"
                },
                {
                    "EventType": "다국어 메뉴탭 초기화",
                    "PRE_ID": 2,
                    "ID": 3,
                    "CompName": "sys-menu-code",
                    "CompXType": "panel",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드상세 다국어 초기화"
                }
            ];

            var menuInsert =[{
                    "EventType": "메뉴리스트 추가",
                    "PRE_ID": "",
                    "ID": 1,
                    "CompName": "sys-menu-tree",
                    "CompXType": "treepanel",
                    "Event": "",
                    "CustomEvent": "InsertMode",
                    "Comment": "코드그룹로드"
                },
                {
                    "EventType": "다국어 메뉴탭 초기화",
                    "PRE_ID": 1,
                    "ID": 2,
                    "CompName": "sys-menu-tab",
                    "CompXType": "tabpanel",
                    "Event": "",
                    "CustomEvent": "InsertMode",
                    "Comment": "코드리스트 초기화"
                },
                {
                    "EventType": "다국어 메뉴탭 초기화",
                    "PRE_ID": 2,
                    "ID": 3,
                    "CompName": "sys-menu-code",
                    "CompXType": "panel",
                    "Event": "",
                    "CustomEvent": "InsertMode",
                    "Comment": "코드상세 다국어 초기화"
                }];
            var menuUpdate =[{
                    "EventType": "메뉴리스트 추가",
                    "PRE_ID": "",
                    "ID": 1,
                    "CompName": "sys-menu-tree",
                    "CompXType": "treepanel",
                    "Event": "select",
                    "Comment": "코드그룹로드"
                },
                {
                    "EventType": "다국어 메뉴탭 초기화",
                    "PRE_ID": 1,
                    "ID": 2,
                    "CompName": "sys-menu-tab",
                    "CompXType": "tabpanel",
                    "Event": "",
                    "CustomEvent": "UpdateMode",
                    "Comment": "코드리스트 초기화"
                },
                {
                    "EventType": "다국어 메뉴탭 초기화",
                    "PRE_ID": 2,
                    "ID": 3,
                    "CompName": "sys-menu-code",
                    "CompXType": "panel",
                    "Event": "",
                    "CustomEvent": "UpdateMode",
                    "Comment": "코드상세 다국어 초기화"
                }];
            return [menuLoad,menuInsert,menuUpdate];
        },
        'SysApp.view.sys.code.SysCode' : function () {
            var codeGroupLoad = [
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": "",
                    "ID": 1,
                    "CompName": "sys-code-group-grid",
                    "CompXType": "grid",
                    "Event": "storeLoad",
                    "CustomEvent": "",
                    "Comment": "코드그룹로드"
                },
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": 1,
                    "ID": 2,
                    "CompName": "sys-code-grid",
                    "CompXType": "grid",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드리스트 초기화"
                },
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": 2,
                    "ID": 3,
                    "CompName": "sys-code-tab",
                    "CompXType": "tabpanel",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드상세 다국어 초기화"
                }
            ];

            var codeLoad = [{
                "EventType": "코드목록로드",
                "PRE_ID": "",
                "ID": 1,
                "CompName": "sys-code-grid",
                "CompXType": "grid",
                "Event": "storeLoad",
                "CustomEvent": "",
                "Comment": "코드목록로드"
            }, {
                "EventType": "코드목록로드",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-code-tab",
                "CompXType": "tabpanel",
                "Event": "",
                "CustomEvent": "insertMode",
                "Comment": "코드리스트 초기화"
            }];

            var codeSelect = [{
                "EventType": "코드목록선택",
                "PRE_ID": "",
                "ID": 1,
                "CompName": "sys-code-grid",
                "CompXType": "grid",
                "Event": "select",
                "CustomEvent": "",
                "Comment": "코드목록선택"
            }, {
                "EventType": "코드목록선택",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-code-tab",
                "CompXType": "tabpanel",
                "Event": "",
                "CustomEvent": "updateMode",
                "Comment": "폼 수정모드"
            }];

            return [codeGroupLoad,codeLoad,codeSelect];
        },
        'SysApp.view.sys.role.SysRole' : function () {
            var sysroleLoad = [
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": "",
                    "ID": 1,
                    "CompName": "sys-role-grid",
                    "CompXType": "grid",
                    "Event": "storeLoad",
                    "CustomEvent": "",
                    "Comment": "코드그룹로드"
                },
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": 1,
                    "ID": 2,
                    "CompName": "sys-role-tab",
                    "CompXType": "tabpanel",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드리스트 초기화"
                },
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": 2,
                    "ID": 3,
                    "CompName": "sys-role-page",
                    "CompXType": "grid",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드상세 다국어 초기화"
                }
            ];


            var sysroleSelect = [{
                "EventType": "코드목록로드",
                "PRE_ID": "",
                "ID": 1,
                "CompName": "sys-role-grid",
                "CompXType": "grid",
                "Event": "select",
                "CustomEvent": "",
                "Comment": "코드선택"
            }, {
                "EventType": "코드목록로드",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-role-tab",
                "CompXType": "tabpanel",
                "Event": "",
                "CustomEvent": "UpdateMode",
                "Comment": "코드리스트 초기화"
            }];


            return [sysroleLoad,sysroleSelect];
        }
    }
});