Ext.define('Pmhtech.override.form.field.Base', {
    override: 'Ext.form.field.Base',

    initComponent: function () {
        var me = this;
        me.callParent(arguments);
        me.addListener('afterrender',function(component){
            if(component.allowBlank===false){
                component.setAllowBlank(component.allowBlank);
            }
        });
    },

    setAllowBlank : function(allowBlank,afterTextLabel){
        var me = this;
        if(afterTextLabel==undefined){
            afterTextLabel= '<font color="red">*</font>';
            me.allowBlank = false;
        }
        if(allowBlank){
           me.labelEl.dom.innerHTML= me.fieldLabel +me.labelSeparator;
         }else{
          me.labelEl.dom.innerHTML =me.fieldLabel +me.labelSeparator +afterTextLabel;
        }
    }
});