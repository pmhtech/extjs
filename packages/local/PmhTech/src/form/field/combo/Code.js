Ext.define('PmhTech.form.field.combo.Code',{
    extend : 'Ext.form.field.ComboBox',
    alias: ['widget.pmh-combobox-code', 'widget.pmh-combo-code'],
    sysCodeName : null,
    displayField : 'CODE_NM',
    valueField : 'CODE',
    initComponent : function(){

        var me = this;

        if(me.sysCodeName){
            Ext.apply(me,{
                store : SysCode[me.sysCodeName].copy()
            });
        }
        me.callParent(arguments);


    }
});