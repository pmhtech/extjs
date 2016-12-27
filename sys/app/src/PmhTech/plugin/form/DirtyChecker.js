/*
*
*
*/Ext.define('PmhTech.plugin.form.DirtyCheckerPlugin', {
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
	 * @public
	 * Form Validation
	 * @param {Ext.form.Panel}
	 * @return {boolean} 오류 발생시 false 없으면 true
	 *
	 */
	/**
	 * @public
	 * Form Validation
	 * @param {Ext.form.Panel}
	 * @return {boolean} 오류 발생시 false 없으면 true
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
	 * @public
	 * Form Validation
	 * @param {Ext.form.Panel}
	 * @return {boolean} 오류 발생시 false 없으면 true
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