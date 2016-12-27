Ext.define('PmhTech.override.panel.Panel', {
    override: 'Ext.panel.Panel',

    initComponent: function () {
        var me = this;
        me.on('afterrender',function(comp){
            comp.fireEvent('InitMode', comp);

        });
        me.callParent(arguments);


    }

});