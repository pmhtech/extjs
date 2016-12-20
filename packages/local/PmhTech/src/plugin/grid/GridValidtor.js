Ext.define('PmhTech.plugin.form.GridValidator', {
	extend: 'PmhTech.plugin.AbstractValidator',
	alias: 'plugin.pmh-grid-validator',
	init: function (form) {
		var me = this;
		me.form = form;
		me.basicForm = form.getForm();
		me.basicForm.isValidGrid = Ext.Function.bind(me.isValidGrid, me);
	},


	/**
	 * @public
	 * Grid상의 모든 editor를 가져온다.
	 * @param {Ext.grid.Panel} 대상 그리드
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
	 *  사용법은 다음과 같습니다.
	 *  아래코드 사용시 column내부의 editor들의 Validation을 가져오고 오류 발생시 가장 첫번째 editor로 focus됩니다.
	 *
	 *	rowEditPlugin.addListener('validateedit', function(editor, context, eOpts) {
         *
         *		if(!PmhTech.util.isValidGridEditor(this)){
         *  		return false;
         * 		}
         *	});
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