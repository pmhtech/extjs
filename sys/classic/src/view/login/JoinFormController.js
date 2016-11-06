Ext.define('SysApp.view.login.JoinFormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.join_form',
    onBtnJoin : function() {

        var me = this;
        Ext.Msg.confirm('확인','회원가입을 하시겠습니까?',function(btn){
           if(btn=='yes'){
               me.doJoinProcess();
           }
        });


    },
    doJoinProcess : function(){
        var paramObj = this.getView().getForm().getValues();

        var callbackFunc = function(response){

        };

        AjaxUtil.request('UserMst', 'DEFAULT', 'POST', paramObj, this.doJoinSuccess);
    },
    doJoinSuccess : function(response){
        debugger;
    },
    onBtnReset : function(){
      this.getView().getForm().reset();
    },
    onBtnLogin : function(){
        this.getView().hide();
        var popup = Ext.ComponentQuery.query('login_form')[0];
        popup.show();
    }
});