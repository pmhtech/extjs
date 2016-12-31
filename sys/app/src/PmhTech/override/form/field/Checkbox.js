/**
 *
 */
Ext.define('PmhTech.override.form.field.Checkbox', {
    override: 'Ext.form.field.Checkbox',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        me.addListener('afterrender',function(component){
            if(component.readOnly===true){
                component.setReadOnly(component.readOnly);
            }
        });
    },

    setReadOnly : function(readOnly){
        var me = this;


        me.callParent(arguments);
        if(readOnly){
            me.addCls('x-item-disabled');
        }else{
            me.removeCls('x-item-disabled');
        } 



    }
    
});