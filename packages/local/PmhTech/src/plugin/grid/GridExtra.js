Ext.define('PmhTech.plugin.form.GridExtra', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pmh-grid-extra',
	init: function (form) {
		var me = this;
		me.grid = grid;
		me.grid.getSubmitDataList = Ext.Function.bind(me.getSubmitDataList, me);
	},


	getDataIndexes : function(){
		var grid = this.grid;
		var gridColumns = grid.getColumns();
		var listDataIndex = [];
		for(var i=0;i<gridColumns.length;i++){
			var dataIndex = gridColumns[i].dataIndex;
			if(!Ext.isEmpty(dataIndex)){
				listDataIndex.push(dataIndex);
			}
		}
		return listDataIndex;
	},
	getSubmitDataList : function(){
		var grid = this.grid;
		var listDataIndex = grid.getDataIndexes();
		var gridStore = grid.getStore();
		var gridDatas = [];
		for(var i=0;i<gridStore.getCount();i++){
			var rec = gridStore.getAt(i);

			var tempObj = {};
			for(var j=0;j<listDataIndex.length;j++){
				var index =listDataIndex[j];
				tempObj[index] = rec.get(index);
			}
			gridDatas.push(tempObj);
		}
		return gridDatas;
	}
});