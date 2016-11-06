Ext.define('PmhTech.util.EventLinkedManager', {
	extend: 'Ext.Base',

	requires: [
		'Ext.data.TreeStore'
	],
	statics: {
		initStore: function () {
			this.businessEventStore = Ext.create('Ext.data.TreeStore', {
				fields: [
					{name: 'CompXType'},
					{name: 'Component'},
					{name: 'EventName'},
					{name: 'EventComment'}
				],
				root: {
					expanded: true,
					text: "All AbstractEvent",
					children: []
				}
			});
			this.abstractEventStore = Ext.create('Ext.data.TreeStore', {
				fields: [
					{name: 'CompXType'},
					{name: 'Component'},
					{name: 'EventName'},
					{name: 'EventComment'}
				],
				root: {
					expanded: true,
					text: "All AbstractEvent",
					children: []
				}
			});
			this.eventLinkStore = Ext.create('Ext.data.TreeStore', {
				fields: [
					{name: 'CompXType'},
					{name: 'Component'},
					{name: 'EventName'},
					{name: 'EventComment'}
				],
				root: {
					expanded: true,
					text: "All AbstractEvent",
					children: []
				}
			});
		},
		initComponentEvent: function (eventProp) {

			if (Ext.isEmpty(this.businessEventStore)) {
				this.initStore();
			}
			var targetComponent = eventProp.Component;
		},

		createBusinessEvent: function (businessEventProp, componentEventProps) {

			var targetComponent = businessEventProp.Component;
			var bzEventName = businessEventProp.EventName;
			var bzEventComment = businessEventProp.EventComment;

			targetComponent.addEvents(bzEventName);
			var initEventProp = componentEventProps[0];

			targetComponent.on(bzEventName, this.fireComponentEvent(initEventProp));

			for (var i = 0; i < componentEventProps.length - 1; i++) {
				var currentProp = componentEventProps[i];
				this.initComponentEvent(currentProp);

				var nextProp = componentEventProps[i + 1];
				var currentComp = currentProp.Component;
				var currentEventName = currentProp.EventName;
				currentComp.addListener(currentEventName, this.fireComponentEvent(nextProp));
			}
		},

		setCustomEventLink: function (targetComponent, parentBusinessEvent, childBusinessEvent) {
			targetComponent.addListener(parentBusinessEvent, targetComponent.fireEvent(childBusinessEvent));
		},

		createAbstractEvent: function (abstractEventProp, abstractEventFunc) {

		},
		fireComponentEvent: function (eventProp) {

			var component =eventProp.Component;
			var compXType = eventProp.CompXType;
			var eventName = eventProp.EventName;
			var eventComment = eventProp.EventComment;

			var funcMap = {
				'grid': {
					'select': function () {
						var grid = component;
						var rec = component.getSelectionModel().getSelection();
						if(rec.length!=0) {
							var index = component.store.find(rec[0]);
							component.fireEvent(eventName, grid, rec, index);
						}
					}
				}
			};

			var retFunc = funcMap[compXType][eventName];

			if (!Ext.isFunction(retFunc)) {
				alert('fireComponentEvent 미정의');
			}
			return retFunc;
		}
	}
});