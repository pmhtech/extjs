/**
 *
 *
 * Validator Plugin 함수
 *
 *
 */
Ext.define('PmhTech.plugin.AbstractValidator', {
	extend: 'Ext.AbstractPlugin',
	/**
	 *  Form Field상의 에러메시지를 전부 가져온다.
	 *
	 * @private
	 * @param {Array} arrField Ext.form.field.Base를 상속받은 객체들이 들어와야만 합니다
	 * @return {Object} 에러가 없다면 null을 리턴 Prototype으로 리턴합니다. obj.errorField, obj.errorMessage 만약에
	 *
	 */
	getFieldsErrorMessage : function(arrField){
		var returnObj = {
			errorMessage:null,
			errorField : null
		};

		var arrErrorMessage = [];

		for(var i=0;i<arrField.length;i++){
			var errObj =null;
			if(Ext.isEmpty(arrField[i].getValue())){
				/**
				 * Ext.form.field.Base를 상속받는 모든객체는 getErrors()라는것이 존재합니다.
				 */
				errObj = arrField[i].getErrors();
			}else{
				errObj = arrField[i].getErrors(arrField[i].getValue());
			}
			//errObj의 목적은 에러메시지 띄운이후 해당 Field로 focus가 자동으로 이루어지게 하기위해서 만들었습니다.
			if(!Ext.isEmpty(errObj)){

				arrErrorMessage.push(errObj[0]);

				if(arrErrorMessage.length==1){
					returnObj.errorField = arrField[i];
				}
			}

		}

		// 에러필드가 존재하지 않으면 null 리턴을합니다.
		if(Ext.isEmpty(returnObj.errorField)){
			return null;
		}

		returnObj.errorMessage = arrErrorMessage.join('<br>').toString();
		return returnObj;

	}
});