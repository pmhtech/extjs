Ext.define('SysApp.view.sys.code.SysCode', {
    extend: 'SysApp.view.content.HBoxDefaultView',
    alias: 'widget.sys-code',
    requires : ['SysApp.view.sys.code.syscode.popup.SysCodePopup'],
    controller: 'sys-code',

    initComponent : function(){
        var me = this;

        Ext.apply(me,{
            leftItems: [{
                title: '코드그룹목록 ',
                xtype: 'sys-code-group',
                onGridSelect: 'onSelectGrid'

            }],
            rightItems: [{
                xtype: 'sys-code-detail-grid',
                title: '코드목록',
                layout : 'fit',
                flex: 1,
                onGridSelect: 'onSelectDetailGrid'
            },{
                xtype: 'sys-code-detail-tab',
                frame : true,
                tabBar :{
                    items: [{
                        xtype : 'tbfill'
                    },{
                        xtype: 'pmh-button-add',
                        handler: 'onBtnAdd',
                        scope: me.getController()
                    },{
                        xtype: 'pmh-button-reset',
                        handler: 'onBtnReset',
                        scope: me.getController()
                    },{
                        xtype: 'pmh-button-save',
                        handler: 'onBtnSave',
                        scope: me.getController()
                    }]
                },
                layout : 'fit',
                flex: 3
            }]

        });

        me.callParent(arguments);



    }
});