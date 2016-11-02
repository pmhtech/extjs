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



        var a= {
            total : "sss",
            sysmenu :{
                "COM_00001": [{CODE: 'KOR'}, {CODE: 'JPN'}],
                "COM_00002": [{CODE: 'KOR'}, {CODE: 'JPN'}],
                "COM_00003": [{CODE: 'KOR'}, {CODE: 'JPN'}],
                "COM_00004": [{CODE: 'KOR'}, {CODE: 'JPN'}]
            }

        };
        this.getView().hide();
        Ext.iterate(resObj.sysCodeGroup,function(key,value){
            SysCode[key]= value;

        });



        SysCode['COM_000001'] =


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

        if(!Ext.isEmpty(userId)){
            comp.getForm().setValues({USER_ID: userId});
            this.doLoginProcess();
        }
        comp.show();


    }
});