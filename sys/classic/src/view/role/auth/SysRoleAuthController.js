Ext.define('SysApp.view.role.auth.SysRoleAuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-auth',

    getEventWireDatas: function () {
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
    },
    onGridSelect: function (selmodel, record, index) {
        PmhTech.Ajax.request({
            url: Ext.String.format('/sys/roles/auth/{0}', record.get('CODE')),
            method: 'GET',
            success: this.onLoadSysRoleAuth,
            scope: this
        });

    },
    onLoadSysRoleAuth: function (resObj) {
        this.getView().down('#sysRoleAuth').getStore().loadRawData(resObj);
    },
    onBtnReset : function(button){


        var selmodel =this.getView().down('sys-role-auth-grid').getSelectionModel();
        var record = selmodel.getSelection()[0];
        this.onGridSelect(selmodel,record);

    },
    onBtnSave: function (button) {
        var USER_AUTH = this.getView().down('sys-role-auth-grid').getSelectionModel().getSelection()[0].get('CODE');

        var store = this.getView().down('#sysRoleAuth').getStore();

        var sysRoleAuths = [];

        for (var i = 0; i < store.getCount(); i++) {

            var rec = store.getAt(i);
            sysRoleAuths.push({
                USER_AUTH: USER_AUTH,
                SYSTEM: rec.get('SYSTEM'),
                ROLE_ID: rec.get('ROLE_ID')
            })
        }


        PmhTech.Ajax.request({
            url: Ext.String.format('/sys/roles/auth/{0}', USER_AUTH),
            method: 'POST',
            params: {
                sysRoleAuths: Ext.encode(sysRoleAuths)
            },
            confirmMsg: {
                title: '확인',
                message: '저장히시겠습니까?'
            },
            successMsg : {
                title : '확인',
                message : '저장되었습니다.'
            },
            success : this.saveCallBack,
            scope : this
        });

    },
    saveCallBack : function(resObj){


    },


    onInitMode: function () {
        var me = this.getView();


        //sysMenuPreView.getStore().removeAll();

    },
    onUpdateMode: function () {

    }


});
