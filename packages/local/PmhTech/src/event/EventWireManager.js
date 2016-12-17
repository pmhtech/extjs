/*
 *
 * */
Ext.define('PmhTech.event.EventWireManager', {
	extend: 'Ext.Base',
	statics: {
		_getComponent: function (masterView, eventNode) {

			var cmpName = eventNode.CompName;
			var cmpXType = eventNode.CompXType;
			var eventName = eventNode.Event;

			var component = masterView.down(cmpName);
			if (component.getXTypes().search(cmpXType) == -1) {
				alert('Component의 Xtype이 잘못되었습니다');
				console.log(component);
				return false;
			}
			return {
				component: component,
				eventName: eventName,
				customEventName : eventNode.CustomEvent
			}
		},
		_getChildComponent: function (masterView, eventNode) {

			var cmpName = eventNode.CompName;
			var cmpXType = eventNode.CompXType;
			var eventName = eventNode.Event;

			var component = masterView.down(cmpName);
			if (component.getXTypes().search(cmpXType) == -1) {
				alert('Component의 Xtype이 잘못되었습니다');
				console.log(component);
				return false;
			}
			return {
				component: component,
				eventName: eventName,
				customEventName : eventNode.CustomEvent
			}
		},
		_getArguments: function (arguments) {
			var result = [];

			for (var i = 0; i < arguments.length; i++) {
				result.push(arguments[i]);
			}
			return result;

		},
		_getEventWire: function (masterView, parentNode, childNodes) {


			var me = this;
			var masterEventProps = this._getComponent(masterView, parentNode);
			var parentComp = masterEventProps.component;
			var parentEvent = masterEventProps.eventName || masterEventProps.customEventName;




			for (var i = 0; i < childNodes.length; i++) {
				var childNode = childNodes[i];

				parentComp.addListener(parentEvent, function () {
					console.log(this.Comment);
					var eventProps = me._getChildComponent(masterView, this);
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
		initEvent: function (masterView, array) {

			var treeData = PmhTech.Utils.convertListToTree(array, 'ID', 'PRE_ID', '');
			var rootNode = treeData[0];

			this._getEventWire(masterView, rootNode, rootNode.children);


		}
	}
});