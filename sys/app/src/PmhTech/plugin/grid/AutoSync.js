/**
 *
 *
 *
 *
 *
 */
Ext.define('PmhTech.plugin.AutoSync', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pmh-grid-autosync',
	init: function (grid) {
		var me = this;
		me.grid = grid;
		grid.setAutoSyncStore = Ext.Function.bind(me.setAutoSyncStore, me);
	},

	/**
	 * @public
	 * 반드시 afterrender 이벤트내에 서술
	 * 해
	 * @param {Ext.data.Store}
	 */
	setAutoSyncStore: function () {

		var me = this;
		var store = me.grid.getStore();
		/**
		 * 기존의 store가 autoSync라면 사용안함으로 세팅
		 */
		store.autoSync = false;
		store.addListener('update', function (thisStore, record, operation, modifiedFieldNames) {

			if (operation == 'edit') {

					/**
					 버그원인
					 Sencha Docs를 autoSync보시면 edit이벤트 발생시에 바로 store.sync가 되어버림
					 하지만  edit가 완료된 시점에서야 checkbox 및 datefield의 inputValue가
					 데이터가 Binding이 이루어짐
					 그때문에 checkboxfield는 ture,false로 DateField는 inputVlaue의 세팅값의 상관없이 toString해서 넘어감
					 */
					me.autoSyncDataCalibration(grid);

				/**
				 Ext.data.Store의 suspendAutoSync를 대체
				 suspendPmhAutoSync가 true이면 AutoSync가 일시적으로 작동안됨
				 */
				if (thisStore.suspendPmhAutoSync != true) {
					thisStore.sync();
				}
				thisStore.commitChanges();
			}
		});

		store.addListener('remove', function (thisStore, record, index, isMove, eOpts) {
			if (thisStore.suspendPmhAutoSync != true) {
				thisStore.sync();
			}
			thisStore.commitChanges();
		});

		store.addListener('add', function (thisStore, records, index) {
			if (thisStore.suspendPmhAutoSync != true) {
				thisStore.sync();
			}
			thisStore.commitChanges();
		});
		store.addListener('write', function (thisStore, records, index) {


			/**
			 * Store의 write이벤트는 정상적으로 백엔드에서 HttpStatus가 정상처리(200,201)되었을때 실행되는 이벤트
			 * 매우 중요 !!!
			 *
			 * 기존 autoSync는 파라미터를 넣지 못하는 구조라서 아래의 코드가 반드시 필요 이런식으로 구현할경우
			 * 그냥 grid.store.load()라 하면 파라미터가 Injection되어서 자동으로 호출이 이루어집니다.
			 *
			 * rowEditPlugin.addListener('beforeload',(store, operation, eOpts){
                *
                *
                *   // 파라미터가 있는지 체크후 강제로 parameter가 존재하지 않는경우
                *   // 현재 로드이벤트는 무시하고 파라미터를 강제로 넣어서 다시로드시킴
                *       if(Ext.isEmpty(store.lastOptions.params) || Ext.isEmpty(store.lastOptions.params.EMP_ID)){
                *
                *           store.load({params:{
                *               'PK1': rec.get('PK1'),
                *               'PK2' : rec.get('PK2')
                *           }});
                *			//return이 false이면 load가 발생이 안되므로 파라미터가 없이는 호출이 불가능하게끔 구현
                *           return false;
                *       }
                *   });
			 *
			 *
			 *
			 *
			 */
			thisStore.load();
		});
	},
	/**
	 * @public
	 * autoSync를 사용하는데 grid를 초기화 시키고 싶을경우
	 * autoSync가 true상태에서 removeAll을 시키면 store.api.destroy가 호출되므로 그점을 방지
	 *
	 * @param {Ext.grid.Panel} 초기화시킬 grid추가
	 */
	removeAllOnly: function () {
		var store = this.grid.getStore();
		store.suspendPmhAutoSync = true;
		if (store.autoSync === true) {
			store.suspendAutoSync();
		}
		store.removeAll(false);
		if (store.autoSync === true) {
			store.resumeAutoSync();
		}
		store.suspendPmhAutoSync = false;
	},
	/**
	 * @private
	 * autoSync데이터보정 직접호출하시면 안됩니다.
	 * @param {Ext.grid.Panel} cls The class to add
	 */
	autoSyncDataCalibration: function(grid) {

		var columns = grid.getColumns();
		/**
		 현재 선택된 Row의 데이터보정을 위해서 가져옴
		 */
		var rec = grid.getSelectionModel().getSelection()[0];

		var dataObj = {};

		for(var i=0;i<columns.length;i++){

			var column = columns[i];
			var fieldName  = column.dataIndex;
			if(Ext.isEmpty(fieldName)) continue;
			/**
			 hidden 필드는 데이터보정에서 제외
			 */
			var editor=  column.getEditor();



			var fieldValue = rec.data[fieldName];

			if(!Ext.isEmpty(editor)){


				switch(editor.xtype){
				/**
				 * checkboxfield 데이터보정
				 */
					case 'checkboxfield' :
						fieldValue = fieldValue ? editor.inputValue : editor.uncheckedValue;

						break;
				/**
				 * datefield 데이터보정
				 */
					case 'datefield' :

						fieldValue = Ext.util.Format.date(fieldValue,editor.submitFormat);
						break;
				/**
				 *  그밖의 추가되는 케이스는 아래에 서술
				 *
				 */
				}

			}
			dataObj[fieldName] = fieldValue;
		}

		/**

		 rec.set(dataObj)를 하면
		 grid상의 edit 이벤트가 발생되어서 Ajax호출이 중복 발생됩니다.
		 */
		rec.data = dataObj;

	}
});

