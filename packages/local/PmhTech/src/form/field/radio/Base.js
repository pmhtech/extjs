Ext.define('PmhTech.form.field.radio.Base', {
    extend: 'Ext.container.Container',
    alias: 'widget.pmhtech-radio-base',
    height : 50,
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
                title: title,
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