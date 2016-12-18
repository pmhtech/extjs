Ext.define('PmhTech.event.EventMap', {
    extend: 'Ext.Base',

    statics: {
        'SysApp.view.sys.menu.SysMenu': function(){
            var menuLoad = [
                {
                    "EventType": "메뉴리스트 초기화",
                    "PRE_ID": "",
                    "ID": 1,
                    "CompName": "sys-menu-tree",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드그룹로드"
                },
                {
                    "EventType": "다국어 메뉴탭 초기화",
                    "PRE_ID": 1,
                    "ID": 2,
                    "CompName": "sys-menu-tab",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드리스트 초기화"
                },
                {
                    "EventType": "다국어 메뉴탭 초기화",
                    "PRE_ID": 2,
                    "ID": 3,
                    "CompName": "sys-menu-code",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드상세 다국어 초기화"
                }
            ];

            var menuUpdate =[{
                    "EventType": "메뉴리스트 추가",
                    "PRE_ID": "",
                    "ID": 1,
                    "CompName": "sys-menu-tree",
                    "Event": "select",
                    "Comment": "코드그룹로드(selmodel,record,index)"
                },
                {
                    "EventType": "다국어 메뉴탭 초기화",
                    "PRE_ID": 1,
                    "ID": 2,
                    "CompName": "sys-menu-tab",
                    "Event": "",
                    "CustomEvent": "UpdateMode",
                    "Comment": "코드리스트 초기화"
                },
                {
                    "EventType": "다국어 메뉴탭 초기화",
                    "PRE_ID": 2,
                    "ID": 3,
                    "CompName": "sys-menu-code",
                    "Event": "",
                    "CustomEvent": "UpdateMode",
                    "Comment": "코드상세 다국어 초기화"
                }];
            return [menuLoad,menuUpdate];
        },
        'SysApp.view.sys.code.SysCode' : function () {
            var codeGroupLoad = [
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": "",
                    "ID": 1,
                    "CompName": "sys-code-group-grid",
                    "Event": "storeLoad",
                    "CustomEvent": "",
                    "Comment": "코드그룹로드 (store)"
                },
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": 1,
                    "ID": 2,
                    "CompName": "sys-code-grid",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드리스트 초기화"
                },
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": 2,
                    "ID": 3,
                    "CompName": "sys-code-tab",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드상세 다국어 초기화"
                }
            ];

            var codeGroupSelect = [
                {
                    "EventType": "그룹코드선택",
                    "PRE_ID": "",
                    "ID": 1,
                    "CompName": "sys-code-group-grid",
                    "Event": "select",
                    "CustomEvent": "",
                    "Comment": "코드그룹선택 (selmodel,record,index)"
                },
                {
                    "EventType": "그룹코드선택",
                    "PRE_ID": 1,
                    "ID": 2,
                    "CompName": "sys-code-tab",
                    "Event": "",
                    "CustomEvent": "InsertMode",
                    "Comment": "코드상세 다국어 초기화"
                }
            ];



            var codeSelect = [{
                "EventType": "코드목록선택",
                "PRE_ID": "",
                "ID": 1,
                "CompName": "sys-code-grid",
                "Event": "select",
                "CustomEvent": "",
                "Comment": "코드목록선택(selmodel,record,index)"
            }, {
                "EventType": "코드목록선택",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-code-tab",
                "Event": "",
                "CustomEvent": "updateMode",
                "Comment": "폼 수정모드"
            }];

            return [codeGroupLoad,codeGroupSelect,codeSelect];
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
        },
        'SysApp.view.sys.role.auth.SysRoleAuth' : function () {
            var sysroleLoad = [
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": "",
                    "ID": 1,
                    "CompName": "sys-role-auth-grid",
                    "CompXType": "grid",
                    "Event": "storeLoad",
                    "CustomEvent": "",
                    "Comment": "코드그룹로드"
                },
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": 1,
                    "ID": 2,
                    "CompName": "sys-role-auth-adjust",
                    "CompXType": "panel",
                    "Event": "",
                    "CustomEvent": "InitMode",
                    "Comment": "코드리스트 초기화"
                },
                {
                    "EventType": "그룹코드로드",
                    "PRE_ID": 2,
                    "ID": 3,
                    "CompName": "sys-role-auth-preview",
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
                "CompName": "sys-role-auth-grid",
                "CompXType": "grid",
                "Event": "select",
                "CustomEvent": "",
                "Comment": "코드선택"
            }, {
                "EventType": "코드목록로드",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "sys-role-auth-adjust",
                "CompXType": "panel",
                "Event": "",
                "CustomEvent": "UpdateMode",
                "Comment": "코드리스트 초기화"
            }];

            var sdf = [{
                "EventType": "코드목록로드",
                "PRE_ID": "",
                "ID": 1,
                "CompName": "#sysRoleAuth",


                "Event": "storeLoad",
                "CustomEvent": "",
                "Comment": "코드선택"
            }, {
                "EventType": "코드목록로드",
                "PRE_ID": 1,
                "ID": 2,
                "CompName": "#sysRoleAuth",
                "CompXType": "panel",
                "Event": "storeAdd",
                "CustomEvent": "",
                "Comment": "코드리스트 초기화"
            }];


            return [sysroleLoad,sysroleSelect,sdf];
        }

    }
});