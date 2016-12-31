/**
 *
 *
 *  Form Validation으로 Form상에서 발생된 에러메시지들을 가져온다.
 *
 *
 */
Ext.define('PmhTech.plugin.form.Validator', {
	extend: 'PmhTech.plugin.AbstractValidator',
	alias: 'plugin.pmh-form-validator',
	init: function (form) {
		var me = this;
		me.form = form;
		me.basicForm = form.getForm();
		me.basicForm.isValidForm = Ext.Function.bind(me.isValidForm, me);
		me.form.isValidForm = Ext.Function.bind(me.isValidForm, me);
	},
	/**
	 *
	 * 오류발생시 에러를 출력한다
	 *
	 * @return {Boolean} 오류 발생시 false 없으면 true
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