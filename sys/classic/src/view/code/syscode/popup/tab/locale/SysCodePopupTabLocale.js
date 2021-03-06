Ext.define('SysApp.view.code.syscode.popup.tab.locale.SysCodePopupTabLocale', {
    extend: 'PmhTech.form.Panel',
    alias: 'widget.sys-code-popup-tab-locale',
    controller: 'sys-code-popup',
    initComponent : function(){
        var me = this;


        Ext.apply(me,{
            defaults: {
                columnWidth: 0.5,
                padding: '0 5 5 5'
            },
            items : [{
                xtype : 'textfield',
                fieldLabel : '언어설정',
                value : me.LOCALE_CD,
                name : 'LOCALE_CD',
                hidden : true
            },{
                xtype: 'textfield',
                fieldLabel: '코드명',
                name: 'CODE_NM'
            }, {
                xtype: 'textfield',
                fieldLabel: '참조1 코멘트',
                name: 'REF1'
            }, {
                xtype: 'textfield',
                fieldLabel: '참조2 코멘트',
                name: 'REF2'
            }, {
                xtype: 'textfield',
                fieldLabel: '참조3 코멘트',
                name: 'REF3'
            }, {
                xtype: 'textfield',
                fieldLabel: '참조4 코멘트',
                name: 'REF4'
            }, {
                xtype: 'textfield',
                fieldLabel: '참조5 코멘트',
                name: 'REF5'
            }, {
                xtype: 'textfield',
                fieldLabel: '메모',
                name: 'MEMO',
                columnWidth: 1
            }]
        });

        me.callParent(arguments);


    }


});