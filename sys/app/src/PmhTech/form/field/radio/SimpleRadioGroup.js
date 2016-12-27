Ext.define('PmhTech.form.field.radio.SimpleRadioGroup', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.pmh-radio-group',
    height : 24,
    onChangeRadioGroup : Ext.emptyFn,
    initComponent: function () {
        var me = this;

        var title = Ext.isEmpty(me.title) ? me.fieldLabel : me.title;



        for(var i  in me.radioItems){

            if(!Ext.isEmpty(me.name)){

                me.radioItems[i].name= Ext.clone(me.name);
            }
        }

        Ext.apply(me, {
            items: [{
                xtype: 'fieldset',
                height : 24,
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    xtype: 'radiogroup',
                    listeners : {
                      change : me.onChangeRadioGroup
                    },
                    items: me.radioItems
                }]
            }]
        });
        delete me.name;
        me.callParent(arguments);
    }
});