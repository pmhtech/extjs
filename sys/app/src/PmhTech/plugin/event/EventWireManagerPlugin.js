/**
 *
 *
 *
 *
 *
 */
Ext.define('PmhTech.plugin.event.EventWireManagerPlugin', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.pmh-event-wire-manager',
	init: function (comp) {
		var me = this;
		me.comp = comp;
		var target = comp.getController() || comp;
		var eventWireData = target.getEventWireDatas;

		if(!Ext.isFunction(eventWireData)){
			alert(target.$className+'.getEventWireDatas 미구현됨');
			return false;
		}
		comp.addListener('afterrender',function(){
			var eventDatas = eventWireData();
			for (var i = 0; i < eventDatas.length; i++) {
				me.setEventWire(comp,eventDatas[i]);
			}
		});
	},
	/**
	 * 이벤트를 연결을 할 컴포넌트와 이벤트타입을 가져온다
	 *
	 * @param {Ext.Component} 이벤트시작 지점이 되는 컴포넌트
	 * @param {Object} 이벤트노드
	 * @return {Object}  대상컴포넌트와 이벤트명, 커스텀이벤트명
	 * @private
	 */
	_getComponent: function (masterView, eventNode) {

		var cmpName = eventNode.CompName;
		var eventName = eventNode.Event;

		var component = masterView.down(cmpName);
		return {
			component: component,
			eventName: eventName,
			customEventName : eventNode.CustomEvent
		}
	},
	/**
	 * Arguments 재설정해서 가져온다. ExtJS에서 발생된 이벤트를 Custom Event에
	 * 전파시켜주기 위해서 설정
	 *
	 *
	 * @param {Array} arguments
	 * @return {Array}  해당 Argument의 파라미터만 추출해서 리턴시킨다.
	 * @private
	 */
	_getArguments: function (arguments) {
		var result = [];

		for (var i = 0; i < arguments.length; i++) {
			result.push(arguments[i]);
		}
		return result;

	},
	/**
	 * EventTreeNode에 의해 이벤트를 연결시켜준다. 재귀함수로써 마지막 노드까지 이벤트가 연결되어서
	 * Fire되는 구조이다
	 *
	 *
	 * @param {Ext.Component} 부모가 되는 컴포넌트
	 * @param {Object} parentNode 부모가 되는 이벤트Node
	 * @param {Array} childNodes  ParentNode의 ChildNodes 이다
	 * @return {Array}  해당 Argument의 파라미터만 추출해서 리턴시킨다.
	 * @private
	 */
	_getEventWire: function (masterView, parentNode, childNodes) {


		var me = this;
		var masterEventProps = this._getComponent(masterView, parentNode);
		var parentComp = masterEventProps.component;
		var parentEvent = masterEventProps.eventName || masterEventProps.customEventName;




		for (var i = 0; i < childNodes.length; i++) {
			var childNode = childNodes[i];

			parentComp.addListener(parentEvent, function () {
				console.log(this.Comment);
				var eventProps = me._getComponent(masterView, this);
				var component = eventProps.component;
				var customEventName = eventProps.customEventName;
				var eventName = eventProps.eventName;
				var scope = masterView.getController() || masterView;

				scope.beforeEventArgs = me._getArguments(arguments);
				if (eventName) {

					Ext.callback(function () {
						component.fireEventArgs(eventName, arguments);
					}, scope);

				}
				if (customEventName) {
					if (scope.beforeEventArgs.length == 0) {
						scope.beforeEventArgs.push(component);
					}

					Ext.callback(function () {
						component.fireEventArgs(customEventName, this.beforeEventArgs);
					}, scope);
				}
			}, childNode);

			if (Ext.isArray(childNode.children)) {
				me._getEventWire(masterView, childNode, childNode.children);
			}
		}

	},
	/**
	 * EventTreeNode에 의해 이벤트를 연결시켜준다. 재귀함수로써 마지막 노드까지 이벤트가 연결되어서
	 * Fire되는 구조이다
	 *
	 *
	 * @param {Ext.Component} masterView 이벤트 연결이 시작되는 View명
	 * @param {Array} array 아래와 같은 형식과 같은 이벤트를 넘겨주면 아래구조와 같이 이벤트가 연결이 이루어진다
	 */
	setEventWire: function (masterView, array) {

		var treeData = PmhTech.Utils.convertListToTree(array, 'ID', 'PRE_ID', '');
		var rootNode = treeData[0];

		this._getEventWire(masterView, rootNode, rootNode.children);
	}
});
