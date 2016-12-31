/**
 *
 *
 *
 *
 *
 */
Ext.define('PmhTech.toolbar.ButtonToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.pmh-button-toolbar',
    layout : {
        type : 'hbox',
        align : 'stretch'
    },
    btnItems : [],
    buttonAlign : 'center',
    initComponent: function () {
        var me = this;

        var items = [];

        if(me.buttonAlign=='center' ||me.buttonAlign== 'right'){
            items.push({xtype:'tbfill'});
        }
        for(var i=0;i<me.btnItems.length;i++){

            var buttonType = me.btnItems[i];

            var tempObj={};
            if(Ext.isString(buttonType)) {


                Ext.apply(tempObj,{
                    xtype: 'pmh-button-' + buttonType,
                    handler: 'onBtn' + buttonType.charAt(0).toUpperCase() + buttonType.slice(1),
                    scope : me.scope
                });

            }else{
                Ext.apply(tempObj, buttonType);
                Ext.apply(tempObj,{
                    xtype : 'pmh-button-'+buttonType.btnType
                });

                if(!tempObj.handler){
                    tempObj.handler= 'onBtn' + buttonType.btnType.charAt(0).toUpperCase() + buttonType.btnType.slice(1);
                    tempObj.scope = me.scope
                }

            }
            items.push(tempObj);
        }

        if(me.buttonAlign=='center'){
            items.push({xtype:'tbfill'});
        }

        Ext.apply(me, {
            items :items
        });


        me.callParent(arguments);
    }
});