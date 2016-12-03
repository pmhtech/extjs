Ext.define('PmhTech.data.Store', {
    override: 'Ext.data.Store',
    copy: function () {
        var me = this;

        var records = [];
        me.each(function(r){
            records.push(r.copy());
        });
        var store = Ext.create('Ext.data.Store',{
           data : records

        });
        return store;
    },
    loadRawData : function(data,append){
        var me = this;

        me.callParent(arguments);

        if(me.getProxy() && me.getProxy().type=='memory'){

            me.fireEvent('load',me);
        }
    }

});