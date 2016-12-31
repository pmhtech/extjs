/**
 * Ajax 간소화 유틸리티 confirm Message와 success Message를 처리합니다.
 *
 *
 * 		@example
 *     	PmhTech.Ajax.request({
	 *			url : 'resources/json/AjaxTestData.json',
 	 *			method : 'GET',
 	 *			confirmMsg : {
 	 *				title : '확인',
 	 *				message : '저장하시겠습니까?'
 	 *			},
 	 *			successMsg : {
 	 *				title : '확인',
 	 *				message : '정상처리되었습니다'
 	 *			},
 	 *			success : function(resObj){
 	 *				alert('title :'+ resObj.title +'message :'+ resObj.message);
 	 *
 	 *			},
 	 *			scope : this
 	 *		});
 */

Ext.define('PmhTech.Ajax', {
	extend     : 'Ext.Base',
	singleton  : true,

	/**
	 * Sends an HTTP request to a remote server.
	 *
	 *     @example
	 *     PmhTech.Ajax.request({
	 *			url : '/resources/json/AjaxTestData.json',
 	 *			method : 'GET',
 	 *			confirmMsg : {
 	 *				title : '확인',
 	 *				message : '저장하시겠습니까?'
 	 *			},
 	 *			successMsg : {
 	 *				title : '확인',
 	 *				message : '정상처리되었습니다'
 	 *			},
 	 *			success : function(resObj){
 	 *				alert('title :'+ resObj.title +'message :'+ resObj.message);
 	 *
 	 *			},
 	 *			scope : this
 	 *		});
	 *
	 *
	 * @param {Object} options 파라미터는 Object로 넘겨야 하며 사항은 아래와 같습니다
	 * @param {String} options.method 기본 설정값은 GET으로 요청을 합니다
	 * @param {String} options.url : 요청할 URL주소입니다
	 *
	 * @param {Object} options.confirmMsg (optional) Ajax요청 전에 confirmMsg 항목이 있으면 MessageBox가 나타나고
	 * Yes버튼을 눌렀을때에만 Ajax 요청을 합니다. 미지정시 바로 Ajax요청을 합니다.
	 *
	 * @param {Object} options.scope : 요청시 Scope를 지정합니다 반드시 this로 지정을 하셔야만 합니다
	 *
	 * @param {Function} options.success : 요청이 완료되었을때 실행되는 함수입니다.
	 * JSON으로 위 코드와 같이 처리하시면 됩니다.
	 *
	 *  그밖의 사항들은 Ext.Ajax.request와 동일합니다
	 *
	 *  failure 부분은 추후에 Customizing 할수 있도록 구성하도록 하겠습니다.
	 *
	 *
	 *
	 */
	request : function (options) {

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
	/**
	 * Applies padding, margin, border, top, left, height, and width configs to the
	 * appropriate elements.
	 * @private
	 */
	_runAjax: function (options) {

		PmhTech.Ajax.loadMessage = Ext.MessageBox.wait('잠시만 기다리세요..', '데이터 처리중...', {
			interval : 500, //bar will move fast!
			duration : 50000,
			increment: 15
		});


		var callBackFunc = Ext.clone(options.success);
		options.success  = function (response) {
			var resObj = Ext.decode(response.responseText);

			PmhTech.Ajax.loadMessage.hide();
			var me         = this;
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
			PmhTech.Msg.alert('오류', resObj.message);

			console.log('server-side failure with status code ' + response.status);


		};
		Ext.Ajax.request(options);
	}
});