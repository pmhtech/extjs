Ext.define('PmhTech.override.form.Basic', {
    override: 'Ext.form.Basic',
    trackResetOnLoad : true,
    setReadOnlyFields : function(readOnly,fields){
        var me = this;

        if(!Ext.isArray(fields)){
            fields=[];
            var keyMap = me.getValues();

            Ext.iterate(keyMap,function(key,value){
                fields.push(key);
            });
        }

        for(var i=0;i<fields.length;i++){
            var field = fields[i];
            me.findField(field).setReadOnly(readOnly);
        }

    },
    resetClearFields : function(){
        var me = this;
        var valueObject = me.getValues();
        var fields = me.getFields().items;
        for(var i=0;i<fields.length;i++){
            var field = fields[i];
            var fieldName = field.getName();
            valueObject[fieldName]=field.value;
        }
        me.setValues(valueObject);
        me.reset();

    },
    getOriginalValues: function(){
        var me = this;
        var fields = me.getFields().items;
        var valueObject ={};

        for(var i=0;i<fields.length;i++){
            var field = fields[i];
            valueObject[field.name]=field.originalValue;
        }
        return valueObject;
    }
});