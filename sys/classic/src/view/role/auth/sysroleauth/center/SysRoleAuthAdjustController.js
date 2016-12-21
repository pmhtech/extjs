Ext.define('SysApp.view.role.auth.sysroleauth.center.SysRoleAuthAdjustController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-auth-adjust',

    onAfterRender : function(comp){
        PmhTech.Ajax.request({
            url :'/sys/roles',
            method : 'GET',
            success : this.onLoadSysRole,
            scope : this
        });
    },
    onLoadSysRole : function(resObj){
        var me = this.getView();
        me.down('#sysRoleGrid').snapshot = resObj;
        me.down('#sysRoleGrid').getStore().loadRawData(resObj);
    },



    onInitMode : function(){

        var me = this.getView();

        var buttons = me.query('button');

        for(var i=0; i<buttons.length;i++){
            buttons[i].setDisabled(true);
        }

        var sysRoleGrid =me.down('#sysRoleGrid');
        sysRoleGrid.getStore().loadRawData(sysRoleGrid.snapshot);

        var sysRoleAuth =me.down('#sysRoleAuth');
        sysRoleAuth.getStore().removeAll();

    },

    onUpdateMode: function(selmodel,record,index){
        var me = this.getView();
        var buttons = me.query('button');

        for(var i=0; i<buttons.length;i++) {
            buttons[i].setDisabled(false);
        }

    },
    onBtnRemoveCodes : function(button){

        var me = this.getView();
        var sourceGrid = me.down('#sysRoleAuth');
        var targetGrid = me.down('#sysRoleGrid');


        this.setSysMenuCode(sourceGrid,targetGrid);

    },
    onBtnAddCodes : function(button){

        var me = this.getView();
        var sourceGrid = me.down('#sysRoleGrid');
        var targetGrid = me.down('#sysRoleAuth');

        this.setSysMenuCode(sourceGrid,targetGrid);

    },
    setSysMenuCode : function(sourceGrid,targetGrid){
        var records = sourceGrid.getSelectionModel().getSelection();

        var tempRecords = [];
        for(var i=0;i<records.length;i++){
            tempRecords.push(records[i].copy());
        }
        sourceGrid.getStore().remove(records);
        targetGrid.getStore().add(tempRecords);

        sourceGrid.getStore().sort('ROLE_ID', 'ASC');
        targetGrid.getStore().sort('ROLE_ID', 'ASC');
    },onGridLoad : function(store){

        var targetStore = this.getView().down('#sysRoleGrid').getStore();
        var delRecords = [];
        for(var i=0;i<store.getCount();i++){

            var rec = store.getAt(i);
            var findIdx = targetStore.find('ROLE_ID',rec.get('ROLE_ID'));

            if(findIdx !=-1){
                delRecords.push(targetStore.getAt(findIdx));
            }
        }
        targetStore.remove(delRecords);
        targetStore.sort('ROLE_ID', 'ASC');
    },onGridChange : function(){

        var targetStore = this.getView().down('#sysRoleAuth').getStore();
        var sysRoles = [];
        for(var i=0;i<targetStore.getCount();i++){
            var rec= targetStore.getAt(i);
            sysRoles.push({
               SYSTEM : rec.get('SYSTEM'),
               ROLE_ID: rec.get('ROLE_ID')
            });
        }


         var sysRoleAuthPreview = this.getView().up('sys-role-auth').down('sys-role-auth-preview');
            sysRoleAuthPreview.fireEvent('InitMode');


        if(sysRoles.length==0){
            return false;
        }


        PmhTech.Ajax.request({
            url :'/sys/roles/auth/preview',
            method : 'GET',
            params : {
                sysRoles : Ext.encode(sysRoles)
            },
            success : this.onLoadSysRoleAuthPreview,
            scope : this
        });

    },
    onLoadSysRoleAuthPreview : function(resObj){

        var result = resObj.sysRolePage;

        var sysRoleAuthPreview =this.getView().up('sys-role-auth').down('sys-role-auth-preview');
        var rootNode = sysRoleAuthPreview.getStore().getRoot();






        rootNode.cascade({
            after: function (n) {
                if (!Ext.isEmpty(n.data['MENU_ID'])) {
                    for(var i=0;i<result.length;i++){
                        var MENU_ID =result[i].MENU_ID;
                        if(n.data.MENU_ID==MENU_ID){
                            n.set('ACTIVE_YN','Y');
                            break;
                        }
                    }
                }
            }
        });

        sysRoleAuthPreview.getController().onChangeFilter();

    }
});
