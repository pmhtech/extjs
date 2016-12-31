/**
 *
 *
 *
 *
 *
 */
Ext.define('PmhTech.plugin.grid.Validator', {
	extend: 'PmhTech.plugin.AbstractValidator',
	alias: 'plugin.pmh-grid-validator',
	init: function (form) {
		var me = this;
		me.form = form;
		me.basicForm = form.getForm();
		me.basicForm.isValidGrid = Ext.Function.bind(me.isValidGrid, me);
	},

	/**
	 *  Form Field상의 에러메시지를 전부 가져온다.
	 *
	 * @private
	 * @param {Array} arrField Ext.form.field.Base를 상속받은 객체들이 들어와야만 합니다
	 * @return {Object} 에러가 없다면 null을 리턴 Prototype으로 리턴합니다. obj.errorField, obj.errorMessage 만약에
	 *
	 */


	/**
	 *
	 * Grid에 존재하는 Column내에 있는 모든 editor를 가져온다.
	 * @return{Array} Ext.form.field.Base를 상속받는 객체들
	 */
	getGridEditor : function(){
		var columnArray = grid.columns;
		var returnArray =[];

		for(var i=0;i<columnArray.length;i++){

			var fieldName  = columnArray[i].dataIndex;
			if(Ext.isEmpty(fieldName)) continue;

			var editor=columnArray[i].hidden ? null : columnArray[i].getEditor();
			if(!Ext.isEmpty(editor)){
				returnArray.push(editor);
			}

		}
		return returnArray;
	},


	/**
	 * @public
	 * RowEditingPlugin 사용시 그리드의 데이터 Validation
	 * @return {boolean} 오류 발생시 return false
	 *
	 *
	 */
	isValidGrid : function(){
		var grid = this.grid;
		var arrEditor = this.getGridEditor(grid);
		var returnObj = this.getFieldsErrorMessage(arrEditor);

		if(Ext.isEmpty(returnObj)){
			return true;
		}
		Ext.Msg.alert('오류',returnObj.errorMessage,function(){
			returnObj.errorField.focus();
		});

		return false;
	}
});