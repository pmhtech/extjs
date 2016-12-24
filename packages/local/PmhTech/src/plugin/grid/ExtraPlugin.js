Ext.define('PmhTech.plugin.grid.ExtraPlugin', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pmh-grid-extra',
	rowNumberer : 38,
	init: function (grid) {
		var me = this;
		me.grid = grid;
		me.grid.getSubmitData = Ext.Function.bind(me.getSubmitData, me);
		me.grid.getDataIndexes = Ext.Function.bind(me.getDataIndexes, me);
		me.grid.getHttpMethod = Ext.Function.bind(me.getHttpMethod, me);

		var columns = me.getRowNumberer();
		var isCheckerPlugin = me.isCheckerPlugin();

		if(isCheckerPlugin){
			columns.unshift({xtype: 'pmh-checkcolumn', dataIndex: 'isChecked', width: 30});
		}

		grid.reconfigure(columns);
	},

	isCheckerPlugin :function(){
		var grid = this.grid;
		for(var i=0;i<grid.plugins.length;i++){

			if(grid.plugins[i].ptype=='pmh-grid-checker'){
				return true;
			}
		}
		return false;
	},
	getRowNumberer : function(){
		var me = this;
		var grid = me.grid;
		var columns = grid._columns;
		if (Ext.isNumber(me.rowNumberer)) {
			if (Ext.isArray(columns)) {
				columns.unshift({xtype: 'rownumberer', text: '#', width: me.rowNumberer});
			}
		}

		return columns;
	},
	getHttpMethod: function () {

		var grid = this.grid;
		var count = grid.getSelectionModel().getSelection().length;
		return count==0 ? 'POST' : 'PUT';
	},

	/*
	 * @params options : getIndex, InjectData
	 * @params Array, injection
	 *
	 *
	 * */
	getSubmitData: function (listDataIndex,injectDatas) {

		var grid = this.grid;
		var gridStore = grid.getStore();
		var gridDatas = [];

		if(Ext.isEmpty(injectDatas)){
			injectDatas=[];
		}

		for (var i = 0; i < gridStore.getCount(); i++) {
			var rec = gridStore.getAt(i);

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