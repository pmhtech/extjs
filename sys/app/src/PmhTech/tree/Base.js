Ext.define('PmhTech.tree.Base', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.pmh-tree-base',
    storeProps: {
        url: null,
        fields: [],
        rootProperty: null
    },
    initComponent: function () {
        var me = this;

        var columns = Ext.clone(me.columns);

        Ext.apply(me,{
          // store : me.configStore()
        });

        me.callParent(arguments);
    }
});