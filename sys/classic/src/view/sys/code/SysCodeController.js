Ext.define('SysApp.view.sys.SysCodeController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-code',
	getEventWireDatas : function(){
		var codeGroupLoad = [
			{
				"EventType": "그룹코드로드",
				"PRE_ID": "",
				"ID": 1,
				"CompName": "sys-code-group-grid",
				"Event": "storeLoad",
				"CustomEvent": "",
				"Comment": "코드그룹로드 (store)"
			},
			{
				"EventType": "그룹코드로드",
				"PRE_ID": 1,
				"ID": 2,
				"CompName": "sys-code-grid",
				"Event": "",
				"CustomEvent": "InitMode",
				"Comment": "코드리스트 초기화"
			},
			{
				"EventType": "그룹코드로드",
				"PRE_ID": 2,
				"ID": 3,
				"CompName": "sys-code-tab",
				"Event": "",
				"CustomEvent": "InitMode",
				"Comment": "코드상세 다국어 초기화"
			}
		];

		var codeGroupSelect = [
			{
				"EventType": "그룹코드선택",
				"PRE_ID": "",
				"ID": 1,
				"CompName": "sys-code-group-grid",
				"Event": "select",
				"CustomEvent": "",
				"Comment": "코드그룹선택 (selmodel,record,index)"
			},
			{
				"EventType": "그룹코드선택",
				"PRE_ID": 1,
				"ID": 2,
				"CompName": "sys-code-tab",
				"Event": "",
				"CustomEvent": "InsertMode",
				"Comment": "코드상세 다국어 초기화"
			}
		];



		var codeSelect = [{
			"EventType": "코드목록선택",
			"PRE_ID": "",
			"ID": 1,
			"CompName": "sys-code-grid",
			"Event": "select",
			"CustomEvent": "",
			"Comment": "코드목록선택(selmodel,record,index)"
		}, {
			"EventType": "코드목록선택",
			"PRE_ID": 1,
			"ID": 2,
			"CompName": "sys-code-tab",
			"Event": "",
			"CustomEvent": "updateMode",
			"Comment": "폼 수정모드"
		}];

		return [codeGroupLoad,codeGroupSelect,codeSelect];

	},
	onBtnAdd: function (button) {


		var me = this.getView();


		me.down('sys-code-grid').getSelectionModel().deselectAll();
		var selmodel = me.down('sys-code-group-grid').getSelectionModel();
		var record = selmodel.getSelection()[0];

		var sysCodeDetailTab = this.getView().down('sys-code-tab');

		sysCodeDetailTab.fireEventArgs('InsertMode',[selmodel,record]);

	},
	onBtnSave: function (button) {

		var detailGrid = this.getView().down('sys-code-grid');

		var method = detailGrid.getSelectionModel().getSelection().length ==0 ? 'POST' :'PUT';
		var sysCodeLocale = [];

		var forms = this.getView().query('sys-code-tab form');
		for (var i = 0; i < forms.length; i++) {
			var form = forms[i];
			if (!PmhTech.util.ValidUtil.isValidForm(form)) {
				return false;
			}
			var valueObject = form.getForm().getValues();
			sysCodeLocale.push(valueObject);
		}

		PmhTech.Ajax.request({
			url: Ext.String.format('/sys/codes/{0}/{1}', sysCodeLocale[0].PRE_CD, sysCodeLocale[0].CODE),
			method: method,
			params: {
				'sysCodeLocales': Ext.encode(sysCodeLocale)
			},
			confirmMsg : {
				title : '확인',
				message : '저장하시겠습니까?'
			},
			successMsg : {
				title : '확인',
				message : '정상처리되었습니다'
			},
			success: this.successSave,
			scope: this
		});

	},
	onBtnReset: function (button) {

		var sysCodeDetailTab = this.getView().down('sys-code-tab');
		var forms = sysCodeDetailTab.query('form');

		for (var i = 0; i < forms.length; i++) {
			forms[i].getForm().reset();
		}
	},

	successSave: function (resObj) {
		var sysCodeGroup = this.getView().down('sys-code-group-grid');
		var selmodel = sysCodeGroup.getSelectionModel();
		this.onSelectGrid(selmodel,selmodel.getSelection()[0]);
	},


	onSelectGrid: function (selModel, record, index) {

		/*var sysCodeDetailTab = this.getView().down('sys-code-tab');

		sysCodeDetailTab.down('pmh-button-add').setDisabled(false);
		sysCodeDetailTab.down('pmh-button-save').setDisabled(false);
		sysCodeDetailTab.down('pmh-button-reset').setDisabled(false);



		var localeForms = this.getView().query('sys-code-tab form');


		var findIdx = SysCode['COM_000002'].find('CODE', 'DEFAULT');

		var defaultLang = SysCode['COM_000002'].getAt(findIdx).get('REF1');


		for (var i = 0; i < localeForms.length; i++) {
			var localeForm = localeForms[i];
			var LOCALE_CD = localeForm.LOCALE_CD;
			var refFields = localeForm.down('#refFields');
			refFields.removeAll();
			var locale = record.data.LANGUAGE[LOCALE_CD];

			var defaultReadOnly = LOCALE_CD != defaultLang;
			localeForm.setReadOnlyFields(defaultReadOnly, ['COMPANY', 'CODE', 'USE_YN', 'SORT']);

			var fields = [];
			for (var j = 1; j <= 5; j++) {
				var name = 'REF' + j;

				var config = record.data[name + '_CONFIG'].split('-');

				var EDIT_YN = config[0];
				var FIELD_TYPE = config[1];
				var comboStore = config[2];


				var fieldLabel = Ext.isEmpty(locale[name]) ? '관리항목' + j : locale[name];
				var readOnly = defaultReadOnly && EDIT_YN == 'N';

				var field = null;
				switch (FIELD_TYPE) {
					case '10' :
						field = {
							xtype: 'textfield',
							fieldLabel: fieldLabel,
							name: name,
							readOnly: readOnly
						};
						break;
					case '20' :
						field = {
							xtype: 'pmh-combo-code',
							fieldLabel: fieldLabel,
							name: name,
							store: SysCode[comboStore].copy(false),
							readOnly: readOnly
						};
						break;
					case '30' :
						field = {
							xtype: 'datefield',
							fieldLabel: fieldLabel,
							name: name,
							readOnly: readOnly
						};
						break;
				}

				if (LOCALE_CD == defaultLang && EDIT_YN == 'N') {
					field.listeners = {
						change: this.onChangeREF,
						scope: this
					}
				}

				fields.push(field);
			}
			refFields.add(fields);
		}*/

		var paramObj = {
			PRE_CD: record.get('PRE_CD')
		};


		PmhTech.Ajax.request({
			url: Ext.String.format('/sys/codes/{0}', paramObj.PRE_CD),
			mode: 'GET',
			success: this.successLoad,
			scope: this
		});
	},

	onChangeREF: function (field, newValue, oldValue) {

		var locales = this.getView().query('sys-code-locale-form');

		for (var i = 0; i < locales.length; i++) {
			locales[i].down('[name=' + field.name + ']').setValue(newValue);
		}
	},


	successLoad: function (resObj) {

		var grid = this.getView().down('sys-code-grid');
		var form = this.getView().down('sys-code-locale-form');

		var rec = this.getView().down('sys-code-group-grid').getSelectionModel().getSelection();
		form.getForm().setValues(rec.data);

		grid.getStore().loadRawData(resObj);
	},
	onSelectDetailGrid: function (grid, record, index) {

		var localeForms = this.getView().query('sys-code-tab form');
		var localeData = record.data.LANGUAGE;

		for (var i = 0; i < localeForms.length; i++) {
			var localeForm = localeForms[i];
			var LOCALE_CD = localeForm.LOCALE_CD;

			localeForm.getForm().setValues(localeData[LOCALE_CD]);
		}
	}
});