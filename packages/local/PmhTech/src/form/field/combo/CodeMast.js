Ext.define('PmhTech.form.field.combo.CodeMast', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.kpmg_combocodemast',

    initComponent : function(){
        var me = this;

        Ext.apply(me,{
            fieldLabel : me.fieldLabel,
            name: me.name,
            store: getMastCode(me.superCode),
            valueField: Ext.isEmpty(me.valueField)? 'REAL_CODE' : me.valueField,
            displayField: 'CODE_NAME',
            typeAhead: false, editable: false,
            triggerAction: 'all',
            tpl: Ext.create('Ext.XTemplate',
                '<tpl for="."><div class="x-boundlist-item">{REAL_CODE} - {CODE_NAME}</div></tpl>'
            ),
            displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">{REAL_CODE} - {CODE_NAME}</tpl>'
            )

        });

        me.callParent(arguments);
    }
});