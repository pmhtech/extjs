Ext.define('PmhTech.Ajax', {
	extend: 'Ext.Base',
	statics: {
		confirmMsg: null,
		successMsg: null,
		loadMessage: null,
		request: function (options) {

			if (options.params) {
				//  options.jsonData = Ext.encode(options.params);
			}

			var me = this;

			var confirmMsg = options.confirmMsg;

			if (confirmMsg) {
				PmhTech.Msg.confirm(confirmMsg.title, confirmMsg.message, function (b) {
					me._runAjax(options);
				});
			} else {
				me._runAjax(options);
			}
		},
		_runAjax: function (options) {

			PmhTech.Ajax.loadMessage=Ext.MessageBox.wait('잠시만 기다리세요..','데이터 처리중...', {
				interval: 500, //bar will move fast!
				duration: 50000,
				increment: 15
			});


			var callBackFunc = Ext.clone(options.success);
			options.success = function (response) {
				var resObj = Ext.decode(response.responseText);

				PmhTech.Ajax.loadMessage.hide();
				var me = this;
				var successMsg = options.successMsg;

				if (successMsg) {
					PmhTech.Msg.alert(successMsg.title, successMsg.message, function () {
						Ext.callback(callBackFunc, me, [resObj]);
					});
				} else {
					Ext.callback(callBackFunc, me, [resObj]);
				}
			};

			options.failure = function (response) {
				PmhTech.Ajax.loadMessage.hide();
				var resObj = Ext.decode(response.responseText);
				PmhTech.Msg.alert('오류',resObj.message);

				console.log('server-side failure with status code ' + response.status);


			};

			Ext.Ajax.request(options);

		},


		insertForm: function (scope, url, callBackFunc) {

			var form = scope.getView().down('form');
			if (!PmhTech.util.ValidUtil.isValidForm(form)) {
				return false;
			}
			var paramObj = form.getForm().getValues();
			PmhTech.Ajax.request({
				url: url,
				mode: 'POST',
				jsonData: Ext.encode(paramObj),
				params: paramObj,
				successMsg: {
					title: '신규성공',
					message: '저장하였습니다.'
				},
				success: callBackFunc,
				scope: scope
			});
		},
		updateForm: function (scope, url, callBackFunc) {
			var form = scope.getView().down('form');
			if (!PmhTech.util.ValidUtil.isValidForm(form)) {
				return false;
			}
			var paramObj = form.getForm().getValues();
			PmhTech.Ajax.request({
				url: url,
				mode: 'POST',
				params: paramObj,
				successMsg: {
					title: '수정성공',
					message: '저장하였습니다.'
				},
				success: callBackFunc,
				scope: scope
			});
		},
		deleteForm: function (scope, url, callBackFunc) {

			var form = scope.getView().down('form');
			if (!PmhTech.util.ValidUtil.isValidForm(form)) {
				return false;
			}
			var paramObj = form.getForm().getValues();
			KPMG.Ajax.request({
				url: url,
				mode: 'POST',
				params: paramObj,
				confirmMsg: {
					title: '삭제',
					message: '삭제하시겠습니까?'
				},
				successMsg: {
					title: '삭제성공',
					message: '저장하였습니다.'
				},
				success: callBackFunc,
				scope: scope
			});
		}
	}
});