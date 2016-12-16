Ext.define('PmhTech.plugin.valid.form.FormValidPlugin', {
	extend: 'PmhTech.plugin.valid.AbstractValidPlugin',
	alias: 'plugin.pmh-form-validator',
	init: function (form) {
		var me = this;
		me.form = form;
		me.basicForm = form.getForm();
		me.basicForm.isValidForm = Ext.Function.bind(me.isValidForm, me);
	},
	/**
	 * @public
	 * Form Validation
	 * @param {Ext.form.Panel}
	 * @return {boolean} 오류 발생시 false 없으면 true
	 *
	 */
	isValidForm: function() {


		var basicForm = this.basicForm;

		if(basicForm.isValid()){
			return true;
		}
		var arrField = basicForm.getFields().items;

		var returnObj = this.getFieldsErrorMessage(arrField);


		if(Ext.isEmpty(returnObj)){
			return true;
		}
		Ext.Msg.alert('오류',returnObj.errorMessage,function(){
			returnObj.errorField.focus();
		});

		return false;

	}
});