Ext.define('SysApp.view.sys.menu.SysMenu', {
    extend: 'SysApp.view.content.DefaultView',
    alias: 'widget.sys-menu',
    controller: 'sys-menu',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function () {

        var me = this;
        Ext.apply(me, {
            items: [{
                xtype: 'sys-menu-tree',
                frame : true,
                height: 300,
                listeners: {
                    InitMode : 'onInitMode',
                    InsertMode : 'onInsertMode',
                    UpdateMode : 'onUpdateMode',
                    select: 'onSelectTree',
                    scope: this.getController()
                }
            },{
                xtype: 'panel',
                bodyPadding : '0 10 10 10',
                frame : true,

                dockedItems: [{
                    xtype : 'pmh-button-toolbar',
                    buttonAlign : 'right',
                    dock : 'top',
                    btnItems : ['add','save','reset']
                }],
                title: '메뉴상세정보',
                flex : 1,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                }, items: [{
                    xtype: 'sys-menu-tab',
                    frame: true,
                    flex : 1,
                    layout: 'fit'


                },{
                    xtype: 'sys-menu-code',
                    margin : '0 0 0 15',
                    frame : true,
                    flex : 1
                }]
            }]
            ,listeners : {
                afterrender : 'onAfterRender',
                scope: this.getController()
            }
        });
        me.callParent(arguments);

    }


});