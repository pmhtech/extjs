Ext.define('PmhTech.form.field.combo.Code',{
    extend : 'Ext.form.field.ComboBox',
    alias: ['widget.pmh-combobox-code', 'widget.pmh-combo-code'],
    sysCodeName : null,
    queryMode : 'local',
    displayField : 'CODE_NM',
    valueField : 'CODE',
    initComponent : function(){

        var me = this;
        me.callParent(arguments);

        if(me.sysCodeName){
            Ext.apply(me,{
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