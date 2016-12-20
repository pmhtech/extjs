Ext.define('SysApp.view.sys.menu.sysmenu.tab.locale.SysMenuTabLocaleController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-menu-tab-locale',


	onInitMode: function () {

		var form = this.getView();

		form.getForm().forceReset();
		var defaultLanguage = PmhTech.Utils.getDefaultLanguage();
		var defaultReadOnly = form.LOCALE_CD != defaultLanguage;

		form.setReadOnlyFields(false,['MENU_NM','MEMO']);
		form.setReadOnlyFields(defaultReadOnly, ['SYSTEM','PRE_MENU_ID','MENU_ID','MENU_AUTH','WIDGET_NM','CLASS_NM','MENU_LVL','SORT', 'USE_YN']);

	},

	onUpdateMode: function (selModel,record,index) {

		var defaultLanguage = PmhTech.Utils.getDefaultLanguage();


		var form = this.getView();
		var defaultReadOnly = form.LOCALE_CD != defaultLanguage;

		form.setReadOnlyFields(true,['SYSTEM','PRE_MENU_ID','MENU_ID']);
		form.setReadOnlyFields(false,['MENU_NM','MEMO']);
		form.setReadOnlyFields(defaultReadOnly, ['MENU_AUTH','WIDGET_NM','CLASS_NM','MENU_LVL','SORT', 'USE_YN']);
	},


	onChangeUSE_YN: function (field, newValue, oldValue) {


		var locales = this.getView().up('tabpanel').query('sys-menu-tab-locale');

		for (var i = 0; i < locales.length; i++) {
			var radiogroup = locales[i].down('[name=USE_YN]').up();
			radiogroup.setValue(newValue);
		}
	},
	onChangeNotify: function (field, newValue, oldValue) {


		var locales = this.getView().up('tabpanel').query('sys-menu-tab-locale');

		if(field.name=='PRE_MENU_ID'){
			debugger;
		}

		for (var i = 0; i < locales.length; i++) {
			locales[i].down('[name=' + field.name + ']').setValue(newValue);
		}


	},
	onBlurMENU_LVL : function(field){

		var PRE_MENU_ID =this.getView().down('[name=PRE_MENU_ID]');
		var rootNode =PRE_MENU_ID.getStore().getRoot();
		var record = rootNode.findChild(PRE_MENU_ID.valueField,PRE_MENU_ID.getValue(),true);


		var menuIds = [];
		var MENU_LVL = field.getValue();


		var slicer ={
			'2' : 5,
			'3' : 7,
			'4' : 9
		};
		var suffix = {
			'2' :'0000',
			'3' :'00',
			'4' : ''
		};


		for(var i=0;i<record.childNodes.length;i++){

			var childId = record.childNodes[i].get('MENU_ID');
			if(MENU_LVL==4 && record.get('MENU_ID').substr(slicer[MENU_LVL-1],2) != childId.substr(slicer[MENU_LVL-1],2)){
				continue;
			}
			menuIds.push(childId.substr(slicer[MENU_LVL],2));

		}

		var maxMenuId = Ext.Array.max(menuIds);

		var prefix =record.get('MENU_ID').substr(0,slicer[MENU_LVL]);
		var nextVal = Ext.String.leftPad(parseInt(maxMenuId)+1,2,'0');
		var MENU_ID = prefix+nextVal+suffix[MENU_LVL];

		console.log(MENU_ID);
		var target = this.getView().down('[name=MENU_ID]');
		target.setValue(MENU_ID);


	},
	onCollapsePicker : function(field){
		var rootNode =field.getStore().getRoot();

		var record = rootNode.findChild(field.valueField,field.getValue(),true);

		if(record.get('MENU_LVL')+1 >=2){

			var MENU_LVL = this.getView().down('[name=MENU_LVL]');
			MENU_LVL.setValue(record.get('MENU_LVL')+1);
			MENU_LVL.fireEvent('blur',MENU_LVL);
		}

		if(Ext.isEmpty(record) ||record.isLeaf()){
			PmhTech.Msg.alert('확인','상위메뉴만 선택해야만 합니다.',function(){

				field.reset();
			});
		}
	}
});