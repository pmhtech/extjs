Ext.define('SysApp.view.sys.role.auth.SysRoleAuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-auth',

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
