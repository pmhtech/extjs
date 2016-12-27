Ext.define('PmhTech.form.field.combo.SimpleComboCode',{
    extend : 'Ext.form.field.ComboBox',
    alias: ['widget.pmh-simple-combo-code', 'widget.pmh-combo-code'],
    sysCodeName : null,
    displayField : 'CODE_NM',
    valueField : 'CODE',
    isAll : true,
    initComponent : function(){

        var me = this;

        if(me.sysCodeName){
            Ext.apply(me,{
                store : SysCode[me.sysCodeName].copy(me.isAll)
            });
        }
        me.callParent(arguments);

    }
});