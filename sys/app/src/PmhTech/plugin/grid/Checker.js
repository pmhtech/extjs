/**
 *
 *
 *   CheckBoxSelectionModel을 사용하면 Check 기능을 넣을수 있습니다.
 *   하지만 Check와 Select를 따로 적용시킬때 사용되는 플러그인입니다.
 *
 *
 */
Ext.define('PmhTech.plugin.grid.Checker', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pmh-grid-checker',
	requires: [
		'PmhTech.grid.column.CheckColumn'
	],

	autoCheckChange: false,
	dataIndex: 'isChecked',

	init: function (grid) {
		var me = this;
		me.grid = grid;
		grid.getCheckedSubmitData = Ext.Function.bind(me.getCheckedSubmitData, me);
		grid.getCheckedRecord= Ext.Function.bind(me.getCheckedRecord, me);
		if(me.autoCheckChange){
			me.setAutoCheckChange()
		}
	},
	/**
	 * @private
	 * 값이 변경이 되면 자동으로 Check된다.
	 *
	 */
	setAutoCheckChange : function(){
		var me = this;
		var grid = me.grid;
		grid.getStore().addListener('update', function (thisStore, record, operation, modifiedFieldNames, details) {

			if (modifiedFieldNames[0] != me.dataIndex) {

				delete record.modified[me.dataIndex];

				if ('{}' != Ext.encode(record.modified)) {
					record.set(me.dataIndex, true);
				} else {
					record.set(me.dataIndex, false);
				}
			}
		});
	},

	/*
	 * 현재 Check된 Record들을 반환한다
	 * @return {Array}  Ext.data.Model 의 구성됨
	 *
	 * */
	getCheckedRecord: function () {
		var me = this;
		var store = this.grid.getStore();
		var arr = [];
		for (var i = 0; i < store.getCount(); i++) {

			var rec = store.getAt(i);
			if (rec.get(me.dataIndex) === true) {
				arr.push(rec);
			}
		}
		return arr;
	},

	/*
	 * @params {Array} listDataIndex  가져올 대상 DataIndex
	 * @params {Object} injectDatas (optional) 각 요소별로 추가시킬요소
	 * @return {Array} Check
	 *
	 * */
	getCheckedSubmitData: function (listDataIndex,injectData) {

		var grid = this.grid;
		var gridStore = grid.getStore();
		var gridDatas = [];

		for (var i = 0; i < gridStore.getCount(); i++) {
			var rec = gridStore.getAt(i);

			if(rec.get('isChecked')!==true){
				continue;
			}
			var tempObj = {};

			if(Ext.isArray(listDataIndex)){
				for (var j= 0; j < listDataIndex.length; j++) {
					var key = listDataIndex[j];
					tempObj[key]= rec.get(key);
				}
			}else{
				Ext.iterate(rec.data,function(key,value){
					tempObj[key]=value;
				});
			}

			if(Ext.isObject(injectData)){
				Ext.apply(tempObj,injectData);
			}
			gridDatas.push(tempObj);
		}
		return gridDatas;
	}
});