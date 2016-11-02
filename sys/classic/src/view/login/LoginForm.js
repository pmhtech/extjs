Ext.define('SysApp.view.login.LoginForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.login_form',
    controller : 'login_form',
    title : '로그인',
    width : 250,
    hidden : true,
    height : 200,
    floating : true,
    bodyPadding : 10,
    renderTo : Ext.getBody(),
    layout : {
        type : 'vbox',
        align : 'stretch'
    },
    items: [{
        xtype: 'textfield',
        fieldLabel : '사용자 ID',
        value : 'admin',
        name: 'USER_ID'
    }, {
        xtype: 'textfield',
        fieldLabel :'비밀번호',
        inputType : 'password',
        value : 'ffc99a3b',
        name: 'PASSWORD'
    }],
    bbar: [{
        xtype: 'tbfill'
    }, {
        xtype: 'button',
        text : '로그인',
        handler: 'doLoginProcess'
    }, {
        xtype: 'button',
        text : '회원가입',
        handler: 'showJoinPopup'
    },{
        xtype: 'tbfill'
    }],listeners : {
        afterrender : 'onAfterRender'
    }
});