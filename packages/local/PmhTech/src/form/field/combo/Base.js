Ext.define('PmhTech.form.field.combo.Base',{
    extend : 'Ext.form.field.ComboBox',
    alias: ['widget.pmh-combobox', 'widget.pmh-combo'],
    isShowCode : false,

    initComponent : function(){
        var me = this;

        if(me.isShowCode===true){
            Ext.apply(me,{
                tpl: Ext.create('Ext.XTemplate',
                    '<tpl for="."><div class="x-boundlist-item">[{' + me.valueField + '}]&nbsp;&nbsp;{' + me.displayField + '}</div></tpl>'
                ),
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">[{' + me.valueField + '}]  {' + me.displayField + '}</tpl>'
                )
            });
        }
        me.callParent(arguments);
    }
});