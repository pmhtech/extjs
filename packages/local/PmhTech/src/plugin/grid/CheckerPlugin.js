Ext.define('PmhTech.plugin.grid.CheckerPlugin', {
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

	getDataIndexes: function () {
		var grid = this.grid;
		var gridColumns = grid.getColumns();
		var listDataIndex = [];
		for (var i = 0; i < gridColumns.length; i++) {
			var dataIndex = gridColumns[i].dataIndex;
			if (!Ext.isEmpty(dataIndex)) {
				listDataIndex.push(dataIndex);
			}
		}
		return listDataIndex;
	},
	/*
	 * @params options : getIndex, InjectData
	 * @params Array, injection
	 *
	 *
	 * */
	getCheckedSubmitData: function (listDataIndex,injectDatas) {

		var grid = this.grid;
		var gridStore = grid.getStore();
		var gridDatas = [];

		if(Ext.isEmpty(injectDatas)){
			injectDatas=[];
		}

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

			for (var k= 0; k < injectDatas.length; k++) {
				var injectData = injectDatas[k];
				Ext.apply(tempObj,injectData);
			}

			gridDatas.push(tempObj);
		}
		return gridDatas;
	}
});