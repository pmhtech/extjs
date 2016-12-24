Ext.define('PmhTech.plugin.grid.ExtraPlugin', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pmh-grid-extra',
	init: function (grid) {
		var me = this;
		me.grid = grid;
		me.grid.getSubmitData = Ext.Function.bind(me.getSubmitData, me);
		me.grid.getDataIndexes = Ext.Function.bind(me.getDataIndexes, me);
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
	/*
	* @params options : getIndex, InjectData
	* @params Array, injection
	*
	*
	* */
	getSubmitData : function(options){

		var grid = this.grid;
		if(!Ext.isArray(options)){
			listDataIndex = this.getDataIndexes();
		}
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