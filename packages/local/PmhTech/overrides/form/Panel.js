Ext.define('Samjong.override.form.Panel', {
    override: 'Ext.form.Panel',
	setReadOnlyFields : function(readOnly,fields){
		var me = this;

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