/**
 * Ext.Ajax를 재구현 한 로직으로써 callback및 Resource를 재생성 시켜줍니다.
 *
 *     @example
 *     PmhTech.Ajax.request({
 *     		url : '/sys/roles
 *     		params : {
 *     			sysRoles : Ext.encode(sysRoles),
 *     			sysRoles : Ext.encode(sysRoles),
 * 		    	sysRoles : Ext.encode(sysRoles),
 *
 *  	   	},confrimMsg : {
 *  	   		title : '확인',
 *  	   		message : '저장하시겠습니까?'
 *  	   	},successMsg : {
 *  	   		title : '확인',
 *  	   		message : '정상처리되었습니다'
 *  	   	}
 *
 *     });
 *
 *
 * # Heterogeneous node types.
 *
 * If the tree needs to use different data model classes at different levels there is much flexibility in how to specify this.
 *
 * ### Configuring the Reader.
 *
 */
Ext.define('PmhTech.Ajax', {
	extend: 'Ext.Base',
	statics: {
		confirmMsg: null,
		successMsg: null,
		loadMessage: null,


		/**
		 * Sends an HTTP request to a remote server.
		 *
		 * **Important:** Ajax server requests are asynchronous, and this call will
		 * return before the response has been received. Process any returned data
		 * in a callback function.
		 *
		 *     Ext.Ajax.request({
     *         url: 'ajax_demo/sample.json',
     *         success: function(response, opts) {
     *             var obj = Ext.decode(response.responseText);
     *             console.dir(obj);
     *         },
     *         failure: function(response, opts) {
     *             console.log('server-side failure with status code ' + response.status);
     *         }
     *     });
		 *
		 * To execute a callback function in the correct scope, use the `scope` option.
		 *
		 * @param {Object} options An object which may contain the following properties:
		 *
		 * (The options object may also contain any other property which might be needed to perform
		 * postprocessing in a callback because it is passed to callback functions.)
		 *
		 * @param {String/Function} options.url The URL to which to send the request, or a function
		 * to call which returns a URL string. The scope of the function is specified by the `scope` option.
		 * Defaults to the configured `url`.
		 *
		 * @param {Object/String/Function} options.params An object containing properties which are
		 * used as parameters to the request, a url encoded string or a function to call to get either. The scope
		 * of the function is specified by the `scope` option.
		 *
		 * @param {String} options.method The HTTP method to use
		 * for the request. Defaults to the configured method, or if no method was configured,
		 * "GET" if no parameters are being sent, and "POST" if parameters are being sent.  Note that
		 * the method name is case-sensitive and should be all caps.
		 *
		 * @param {Function} options.callback The function to be called upon receipt of the HTTP response.
		 * The callback is called regardless of success or failure and is passed the following parameters:
		 * @param {Object} options.callback.options The parameter to the request call.
		 * @param {Boolean} options.callback.success True if the request succeeded.
		 * @param {Object} options.callback.response The XMLHttpRequest object containing the response data.
		 * See [www.w3.org/TR/XMLHttpRequest/](http://www.w3.org/TR/XMLHttpRequest/) for details about
		 * accessing elements of the response.
		 *
		 * @param {Function} options.success The function to be called upon success of the request.
		 * The callback is passed the following parameters:
		 * @param {Object} options.success.response The XMLHttpRequest object containing the response data.
		 * @param {Object} options.success.options The parameter to the request call.
		 *
		 * @param {Function} options.failure The function to be called upon failure of the request.
		 * The callback is passed the following parameters:
		 * @param {Object} options.failure.response The XMLHttpRequest object containing the response data.
		 * @param {Object} options.failure.options The parameter to the request call.
		 *
		 * @param {Object} options.scope The scope in which to execute the callbacks: The "this" object for
		 * the callback function. If the `url`, or `params` options were specified as functions from which to
		 * draw values, then this also serves as the scope for those function calls. Defaults to the browser
		 * window.
		 *
		 * @param {Number} options.timeout The timeout in milliseconds to be used for this
		 * request.
		 * Defaults to 30000 milliseconds (30 seconds).
		 *
		 * When a request fails due to timeout the XMLHttpRequest response object will
		 * contain:
		 *
		 *     timedout: true
		 *
		 * @param {Ext.Element/HTMLElement/String} options.form The `<form>` Element or the id of the `<form>`
		 * to pull parameters from.
		 *
		 * @param {Boolean} options.isUpload **Only meaningful when used with the `form` option.**
		 *
		 * True if the form object is a file upload (will be set automatically if the form was configured
		 * with **`enctype`** `"multipart/form-data"`).
		 *
		 * File uploads are not performed using normal "Ajax" techniques, that is they are **not**
		 * performed using XMLHttpRequests. Instead the form is submitted in the standard manner with the
		 * DOM `<form>` element temporarily modified to have its [target][] set to refer to a dynamically
		 * generated, hidden `<iframe>` which is inserted into the document but removed after the return data
		 * has been gathered.
		 *
		 * The server response is parsed by the browser to create the document for the IFRAME. If the
		 * server is using JSON to send the return object, then the [Content-Type][] header must be set to
		 * "text/html" in order to tell the browser to insert the text unchanged into the document body.
		 *
		 * The response text is retrieved from the document, and a fake XMLHttpRequest object is created
		 * containing a `responseText` property in order to conform to the requirements of event handlers
		 * and callbacks.
		 *
		 * Be aware that file upload packets are sent with the content type [multipart/form][] and some server
		 * technologies (notably JEE) may require some custom processing in order to retrieve parameter names
		 * and parameter values from the packet content.
		 *
		 * [target]: http://www.w3.org/TR/REC-html40/present/frames.html#adef-target
		 * [Content-Type]: http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17
		 * [multipart/form]: http://www.faqs.org/rfcs/rfc2388.html
		 *
		 * @param {Object} options.headers Request headers to set for the request.
		 * The XHR will attempt to set an appropriate Content-Type based on the params/data passed
		 * to the request. To prevent this, setting the Content-Type header to `null` or `undefined`
		 * will not attempt to set any Content-Type and it will be left to the browser.
		 *
		 * @param {Object} options.xmlData XML document to use for the post. Note: This will be used instead
		 * of params for the post data. Any params will be appended to the URL.
		 *
		 * @param {Object/String} options.jsonData JSON data to use as the post. Note: This will be used
		 * instead of params for the post data. Any params will be appended to the URL.
		 *
		 * @param {String} options.rawData A raw string to use as the post. Note: This will be used
		 * instead of params for the post data. Any params will be appended to the URL.
		 *
		 * @param {Array} options.binaryData An array of bytes to submit in binary form. Any params will be appended to the URL. If binaryData is present, you must set {@link Ext.data.Connection#binary binary} to <tt>true</tt> and options.method to <tt>POST</tt>.
		 *
		 * @param {Boolean} options.disableCaching True to add a unique cache-buster param to GET requests.
		 *
		 * @param {Boolean} options.withCredentials True to add the withCredentials property to the XHR object
		 *
		 * @param {Boolean} options.binary True if the response should be treated as binary data.  If true, the binary
		 * data will be accessible as a "responseBytes" property on the response object.
		 *
		 * @return {Object} The request object. This may be used to cancel the request.
		 */
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
		/**
		 * Applies padding, margin, border, top, left, height, and width configs to the
		 * appropriate elements.
		 * @private
		 */
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

		}
	}
});