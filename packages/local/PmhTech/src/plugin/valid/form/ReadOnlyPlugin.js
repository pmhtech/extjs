Ext.define('PmhTech.plugin.valid.form.ReadOnlyPlugin', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pmh-form-readonly',
	init: function (form) {
		var me = this;
		me.form = form;
		me.basicForm = form.getForm();
		me.form.setReadOnlyFields = Ext.Function.bind(me.setReadOnlyFields, me);
	},
	/**
	 * @public
	 * Form Validation
	 * @param {Ext.form.Panel}
	 * @return {boolean} 오류 발생시 false 없으면 true
	 *
	 */
	setReadOnlyFields : function(readOnly,fields){
		var me = this.form;

		if(!Ext.isArray(fields)){
			fields=[];
			var temp = me.query('field[name!=undefined]');

			for(var i=0;i<temp.length;i++){
				var name = temp[i].name;

				if(!Ext.Array.contains(fields,name)){
					fields.push(temp[i].name);
				}

			}
		}

		for(var i=0;i<fields.length;i++){

			var targets = me.query('[name='+fields[i]+']');

			Ext.Array.each(targets,function(item){
				item.setReadOnly(readOnly);
			});
		}

	}
});