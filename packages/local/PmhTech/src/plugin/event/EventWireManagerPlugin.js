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
	setEventWire: function (masterView, array) {

		var treeData = PmhTech.Utils.convertListToTree(array, 'ID', 'PRE_ID', '');
		var rootNode = treeData[0];

		this._getEventWire(masterView, rootNode, rootNode.children);
	}
});
