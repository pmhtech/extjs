Ext.define('SysApp.view.sys.role.auth.sysroleauth.center.SysRoleAuthAdjustController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sys-role-auth-adjust',

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


    onBtnRemoveCodes : function(button){

        var me = this.getView();
        var sourceGrid = me.down('#sysRoleAuth');
        var targetGrid = me.down('#sysRoleGrid');


        this.setSysMenuCode(sourceGrid,targetGrid);

    },
    onBtnReset : function(){

    },
    onBtnSave : function(){

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

    }
});
