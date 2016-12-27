Ext.define('PmhTech.form.field.check.SimpleCheckGroup', {
    extend: 'Ext.container.Container',
    alias: ['widget.pmh-simple-check-group','widget.pmh-check-group'],
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
                    xtype: 'checkboxgroup',
                    flex : 1,
                    columns : me.columns,
                    items: me.checkItems
                }]
            }]
        });
        delete me.name;
        me.callParent(arguments);
    }
});