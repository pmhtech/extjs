/**
 *
 *
 *
 *
 *
 */
Ext.define('PmhTech.override.data.Store', {
    override: 'Ext.data.Store',
    copy: function (isAll) {
        var me = this;



        var records = [];
        me.each(function(r){
            records.push(r.copy());
        });

        if(isAll===false){
            records = Ext.Array.slice(records,1);
        }

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