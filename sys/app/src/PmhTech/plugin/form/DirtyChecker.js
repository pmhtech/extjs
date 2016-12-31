/**
 *
 * trackResetOnLoad 를 활성화시켜 loadData 또는 setValues할때 Original값을 유지시키도록 하는 함수
 * 최초 렌더링되었을때 값을 돌려주는 함수가 없으므로 forceReset을 구현하였습니다.
 *
 *
 */
Ext.define('PmhTech.plugin.form.DirtyCheckerPlugin', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pmh-form-dirtychecker',
	init: function (form) {
		var me = this;
		me.form = form;
		me.form.trackResetOnLoad = true;

		me.basicForm = form.getForm();
		me.basicForm.trackResetOnLoad = true;

		me.basicForm.forceReset = Ext.Function.bind(me.forceReset, me);
		me.form.forceReset = Ext.Function.bind(me.forceReset, me);

		me.basicForm.getOriginalValues = Ext.Function.bind(me.getOriginalValues, me);
		me.form.getOriginalValues = Ext.Function.bind(me.getOriginalValues, me);
	},
	/**
	 * 데이터를 입력모드로 전환시킴
	 * @param {Ext.form.Panel}
	 * @return {Boolean} 오류 발생시 false 없으면 true
	 *
	 */
	forceReset : function(){

		var me = this.basicForm;
		var valueObject = me.getValues();
		var fields = me.getFields().items;
		for(var i=0;i<fields.length;i++){
			var field = fields[i];
			var fieldName = field.getName();
			valueObject[fieldName]=field.oriValue;
		}
		me.setValues(valueObject);
	},
	/**
	 * 변경되기전 Original값을 가져온다
	 * @return {Object} 변경되기전값을 리턴한다
	 *
	 */
	getOriginalValues: function(){
		var me = this.basicForm;
		var fields = me.getFields().items;
		var valueObject ={};

		for(var i=0;i<fields.length;i++){
			var field = fields[i];
			valueObject[field.name]=field.originalValue;
		}
		return valueObject;
	}
});