/**
 *
 * Form내에 존재하는 모든 Field들의  ReadOnly를 일괄적용하기 위한 플러그인
 *
 */
Ext.define('PmhTech.plugin.form.ReadOnly', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pmh-form-readonly',
	init: function (form) {
		var me = this;
		me.form = form;
		me.basicForm = form.getForm();
		me.form.setReadOnlyFields = Ext.Function.bind(me.setReadOnlyFields, me);
	},
	/**
	 * Form 전체의 필드 Name에 대한 일괄적인 ReadOnly처리
	 *
	 * @param {Boolean} readOnly true면 ReadOnly 시키고 false면 ReadOnly를 해제시킨다.
	 * @params {Array}  (optional) 해당 필드 Name 을 기술하지 않으면 Form 전체가 적용됨
	 * @return {Boolean} 오류 발생시 false 없으면 true
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