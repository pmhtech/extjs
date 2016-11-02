Ext.define('PmhTech.form.field.ComboBox',{
    extend : 'Ext.form.field.ComboBox',
    alias: ['widget.pmh-combobox', 'widget.pmh-combo'],
    sysCodeName : null,
    queryMode : 'local',
    initComponent : function(){

        var me = this;
        me.callParent(arguments);

        if(me.sysCodeName){
            Ext.apply(me,{
                displayField : 'CODE_NM',
                valueField : 'CODE',
                listeners : {
                    beforerender : function(comp){
                        var store = Ext.create('Ext.data.Store',{
                            data :SysCode[comp.sysCodeName]
                        });
                        comp.setStore(store);
                    }
                }
            });
        }
    }
});