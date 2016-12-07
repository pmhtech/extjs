Ext.define('SysApp.view.sys.SysCodeController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.sys-code',

	onSelectGrid: function (selModel, record, index) {

		var locales = record.data.LANGUAGE;
		var localeTab = this.getView().down('sys-code-detail-tab');


		var findIdx = SysCode['COM_000003'].find('CODE', 'DEFAULT');

		var defaultLang = SysCode['COM_000003'].getAt(findIdx).get('REF1');


		for (var i = 0; i < locales.length; i++) {
			var locale = locales[i];
			var targetForm = localeTab.down('[LOCALE_CD=' + locale.LOCALE_CD + ']');
			var refFields = targetForm.down('#refFields');
			refFields.removeAll();
			var fields = [];
			for (var j = 1; j <= 5; j++) {
				var name = 'REF' + j;

				var config = record.data[name + '_CONFIG'].split('-');

				var EDIT_YN = config[0];
				var FIELD_TYPE = config[1];
				var comboStore = config[2];


				var fieldLabel = Ext.isEmpty(locale[name]) ? '관리항목' + j : locale[name];
				var readOnly = locale.LOCALE_CD != defaultLang && EDIT_YN == 'N';

				var field = null;
				switch (FIELD_TYPE) {
					case '10' :
						field = {
							xtype: 'textfield',
							fieldLabel: fieldLabel,
							name : name,
							readOnly: readOnly
						};
						break;
					case '20' :
						field = {
							xtype: 'pmh-combo-code',
							fieldLabel: fieldLabel,
							name : name,
							store: SysCode[comboStore].copy(false),
							readOnly: readOnly
						};
						break;
					case '30' :
						field = {
							xtype: 'datefield',
							fieldLabel: fieldLabel,
							name : name,
							readOnly: readOnly
						};
						break;
				}
				fields.push(field);
			}
			refFields.add(fields);
		}

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
	successLoad: function (resObj) {

		var grid = this.getView().down('sys-code-detail-grid');
		var form = this.getView().down('sys-code-detail-tab-locale');

		var rec = this.getView().down('sys-code-group').getSelectionModel().getSelection();
		form.getForm().setValues(rec.data);

		grid.getStore().loadRawData(resObj);
	},
	onSelectDetailGrid: function (grid, record, index) {

		var tabPanel = this.getView().down('sys-code-detail-tab');
		var localeDatas = record.data.LANGUAGE;

		debugger;
		for (var i = 0; i < localeDatas.length; i++) {
			var localeData = localeDatas[i];
			var LOCALE_CD = localeData.LOCALE_CD;
			tabPanel.down('[LOCALE_CD=' + LOCALE_CD + ']').getForm().setValues(localeData);
		}
	}
});