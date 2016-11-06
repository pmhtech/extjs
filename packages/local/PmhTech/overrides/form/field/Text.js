Ext.define('PmhTech.override.form.field.Text', {
	override: 'Ext.form.field.Text',
	initComponent: function () {
		var me = this;
		me.callParent(arguments);
		me.addListener('afterrender',function(component){
			if(component.readOnly===true){
				component.setReadOnly(component.readOnly);
			}
		});
	},
	setReadOnly: function (readOnly) {

		var me = this;
		me.callParent(arguments);
		if (readOnly) {
			me.inputEl.addCls('field-readonly');

		} else {
			me.inputEl.removeCls('field-readonly');
		}
	}

});