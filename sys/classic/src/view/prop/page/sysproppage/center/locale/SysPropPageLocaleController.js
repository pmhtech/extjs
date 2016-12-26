Ext.define('SysApp.view.prop.page.sysproppage.center.locale.SysPropPageLocaleController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-prop-page-locale',

	onInitMode : function(){

		this.getView().down('#sysPropPageLocale').getStore().removeAll();
		this.getView().down('propertygrid').getStore().removeAll();


	},
	onSelectGrid : function(selmodel,rec,index){
		this.getView().down('propertygrid').getStore().removeAll();
		var grids = this.getView().up('sys-prop-page-tab').query('#sysPropPageLocale');

		var DOM_PROPS = rec.data.DOM_PROPS;

		var source = Ext.isEmpty(DOM_PROPS) ? [] : Ext.decode(DOM_PROPS);

		var dataObj = this.getDOM_PROPS(rec);

		if(dataObj!==false){
			Ext.applyIf(dataObj.source,source);
			this.setPropertyGrid(rec,dataObj);
		}
		for(var i=0;i<grids.length;i++){
			var grid = grids[i];

			grid.getSelectionModel().select(index);

		}


	},
	onBeforeEdit: function (editor, context) {

		var isDefaultLang = this.getView().LOCALE_CD == PmhTech.Utils.getDefaultLanguage();
		if (!isDefaultLang) {
			switch (context.field) {
				case  'MASTER_DOM' :
				case  'DETAIL_DOM' :
				case  'DOM_QRY' :
				case  'DOM_TYPE' :
				case  'SORT' :
					return false;

			}
		}
		return true;
	},
	onUpdateStore: function (thisStore, rec, operation, modifiedFieldNames, details) {

		var locales = this.getView().up('sys-prop-page-tab').query('#sysPropPageLocale');
		var idx = thisStore.find('id', rec.data.id);

		if(operation == 'edit') {

			for (var i = 0; i < locales.length; i++) {
				var findRec = locales[i].getStore().getAt(idx);
				findRec.set({
					MASTER_DOM: rec.get('MASTER_DOM'),
					isChecked : rec.get('isChecked'),
					DETAIL_DOM: rec.get('DETAIL_DOM'),
					DOM_QRY: rec.get('DOM_QRY'),
					DOM_TYPE: rec.get('DOM_TYPE'),
					SORT: rec.get('SORT')
				});
			}


			if(modifiedFieldNames[0]=='DOM_TYPE'){
				var dataObj = this.getDOM_PROPS(rec);
				if(dataObj!==false){
					this.setPropertyGrid(rec,dataObj);
				}
			}
		}
	},
	getDOM_PROPS: function (rec) {

		var field =this.getView().down('#sysPropPageLocale [dataIndex=DOM_TYPE]').getEditor();

		var findIdx = field.getStore().find('XTYPE_NM', rec.get('DOM_TYPE'));

		if(findIdx==-1){
			return false;
		}
		var PROPS = field.getStore().getAt(findIdx).data.PROPS;

		var source = Ext.decode(PROPS);
		var tempObj = {};
		var config = {};

		for (var i = 0; i < source.length; i++) {
			var data = source[i];
			tempObj[data.KEY] = data.DEFAULT_VALUE;
			config[data.KEY]={
				type : data.TYPE
			};
		}

		return {
			source : Ext.encode(tempObj),
			sourceConfig : Ext.encode(config)
		};
	},
	setPropertyGrid : function(rec,dataObj){
		rec.set('DOM_PROPS',dataObj.source);
		var source = Ext.decode(rec.get('DOM_PROPS'));
		var sourceConfig = Ext.decode(dataObj.sourceConfig);
		var propertyGrid =this.getView().down('propertygrid');
		propertyGrid.getStore().setSource(source);
		propertyGrid.sourceConfig=sourceConfig;
	},
	onBtnDelete : function(button){

		var grids = this.getView().up('sys-prop-page-tab').query('#sysPropPageLocale');

		for(var i=0;i<grids.length;i++){
			var grid = grids[i];
			grid.getStore().remove(grid.getCheckedRecord());
		}

	},
	onAfterRenderPropertyGrid : function(grid){

		var me = this;
		grid.getStore().on('update',function( thisStore , record , operation , modifiedFieldNames , details){

			var target = me.getView().down('#sysPropPageLocale').getSelection()[0];
			var tempObj = {};
			for(var i=0;i<thisStore.getCount();i++){
				var rec = thisStore.getAt(i);
				tempObj[rec.data.name]=rec.data.value;

			}
			var DOM_PROPS = Ext.encode(tempObj);
			target.set('DOM_PROPS',DOM_PROPS);
		});

	}


});