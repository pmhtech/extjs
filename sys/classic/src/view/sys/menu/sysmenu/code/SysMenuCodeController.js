Ext.define('SysApp.view.sys.menu.sysmenu.code.SysMenuCodeController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-menu-code',

	onBtnRemoveCodes : function(button){

		var me = this.getView();

		var sourceGrid = me.down('#sysMenuCode');
		var targetGrid = me.down('#sysCodeGroup');

		this.setSysMenuCode(sourceGrid,targetGrid);

	},
	onBtnAddCodes : function(button){

		var me = this.getView();

		var sourceGrid = me.down('#sysCodeGroup');
		var targetGrid = me.down('#sysMenuCode');

		this.setSysMenuCode(sourceGrid,targetGrid);

	},
	setSysMenuCode : function(sourceGrid,targetGrid){
		var records = sourceGrid.getSelectionModel().getSelection();

		var tempRecords = [];
		for(var i=0;i<records.length;i++){
			tempRecords.push(records[i].copy());
		}
		sourceGrid.getStore().remove(records);
		targetGrid.getStore().add(tempRecords);

		sourceGrid.getStore().sort('PRE_CD', 'ASC');
		targetGrid.getStore().sort('PRE_CD', 'ASC');


	},

	onGridLoad : function(store){

		var targetStore = this.getView().down('#sysCodeGroup').getStore();
		var delRecords = [];
		for(var i=0;i<store.getCount();i++){

			var rec = store.getAt(i);
			var findIdx = targetStore.find('PRE_CD',rec.get('PRE_CD'));

			if(findIdx !=-1){
				delRecords.push(targetStore.getAt(findIdx));
			}
		}
		targetStore.remove(delRecords);
		targetStore.sort('PRE_CD', 'ASC');

	}
});