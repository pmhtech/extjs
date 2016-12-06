Ext.define('PmhTech.form.field.radio.Base', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.pmhtech-radio-base',
    height : 24,
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
                    items: me.radioItems
                }]
            }]
        });
        delete me.name;
        me.callParent(arguments);
    }
});