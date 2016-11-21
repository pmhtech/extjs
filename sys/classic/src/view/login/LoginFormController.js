Ext.define('SysApp.view.login.LoginFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login_form',
    doLoginProcess : function() {
        var paramObj = this.getView().getForm().getValues();
        AjaxUtil.request('UserMst', 'LOGIN', 'POST', paramObj, this.successLoginProcess,this);
    },
    successLoginProcess : function(response){
        var resObj = Ext.decode(response.responseText);
        var sysMenus =  resObj.sysMenu;
        var treeStore = Ext.StoreMgr.lookup('Navigation');
        treeStore.doLoadData(sysMenus);


        this.getView().hide();
        Ext.iterate(resObj.sysCodeGroup,function(key,value){

            SysCode[key]=Ext.create('Ext.data.Store',{
                data : value
            });

        });


        Ext.create('SysApp.view.global.GlobalMain',{
            renderTo : Ext.getBody(),
            listeners : {
                afterrender : function(comp){
                    var MenuController = SysApp.getApplication().getController('menu.MenuController');
                    MenuController.handleRoute(location.hash.substr(1));
                }
            }
        });

    },
    showJoinPopup : function(){
        this.getView().hide();

        var popup = Ext.ComponentQuery.query('join_form')[0];

        if(!popup){
            var popup=Ext.widget('join_form');
        }

        popup.show();
    },
    onAfterRender : function(comp){

        //comp.show();
        this.doLoginProcess();



    }
});