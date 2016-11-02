Ext.define('SysApp.view.login.JoinForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.join_form',
    controller: 'join_form',
    title: '회원가입',
    width: 400,
    floating: true,
    bodyPadding: 10,
    renderTo: Ext.getBody(),
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        allowBlank: false
    },

    items: [{
        xtype: 'textfield',
        hidden: true,
        name: 'COMPANY',
        value: 'C0000'
    }, {
        xtype: 'textfield',
        hidden: true,
        name: 'STATUS',
        value: 'S010'
    }, {
        xtype: 'textfield',
        fieldLabel: '사용자 ID',
        blankText: '사용자 ID를 입력하세요',
        name: 'USER_ID'
    }, {
        xtype: 'textfield',
        fieldLabel: '비밀번호',
        blankText: '비밀번호를 입력하세요',
        inputType: 'password',
        name: 'PASSWORD'
    }, {
        xtype: 'textfield',
        fieldLabel: '비밀번호확인',
        blankText: '비밀번호를 입력하세요',
        inputType: 'password',
        name: 'PASSWORD_CHK'
    }, {
        xtype: 'datefield',
        fieldLabel: '생년월일',
        submitFormat: 'Ymd',
        format: 'Y.m.d.',
        altFormats: 'Ymd|Y.m.d|Y/m/d',
        blankText: '생년월일을 입력하세요',
        name: 'BIRTH_DT'
    }, {
        xtype: 'fieldcontainer',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        fieldLabel: '성명',
        items: [{
            xtype: 'textfield',
            emptyText: '성(한글)',
            allowBlank: false,
            flex: 1,
            name: 'KOR_LAST_NM'
        }, {
            xtype: 'textfield',
            emptyText: '이름(한글)',
            allowBlank: false,
            flex: 1,
            name: 'KOR_FIRST_NM'
        }]
    }, {
        xtype: 'fieldcontainer',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        fieldLabel: '영문성명',
        items: [{
            xtype: 'textfield',
            emptyText: '성',
            flex: 1,
            allowBlank: true,
            name: 'ENG_FIRST_NM'
        }, {
            xtype: 'textfield',
            emptyText: '이름',
            allowBlank: true,
            flex: 1,
            name: 'ENG_LAST_NM'
        }]
    }, {
        xtype: 'textfield',
        fieldLabel: '이메일',
        blankText: '비밀번호를 입력하세요',
        name: 'EMAIL'
    }, {
        xtype: 'textfield',
        fieldLabel: '핸드폰',
        blankText: '비밀번호를 입력하세요',
        name: 'MOBILE'
    }],
    bbar: [{
        xtype: 'tbfill'
    }, {
        xtype: 'button',
        text: '가입하기',
        handler: 'onBtnJoin'
    }, {
        xtype: 'button',
        text: '리셋',
        handler: 'onBtnReset'
    }, {
        xtype: 'button',
        text: '로그인',
        handler: 'onBtnLogin'
    }, {
        xtype: 'tbfill'
    }]
});