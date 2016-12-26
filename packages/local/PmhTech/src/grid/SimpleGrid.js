Ext.define('PmhTech.grid.SimpleGrid', {
	extend: 'Ext.grid.Panel',
	alias: ['widget.pmh-simple-grid'],
	storeProps: {
		url: null,
		fields: [],
		rootProperty: null
	},
	frame: true,
	emptyText: 'No data to display',
	plugins: [],
	initComponent: function () {
		var me = this;

		var columns = me.columns;
		me._columns=Ext.clone(columns);
		me.plugins.push({ptype: 'pmh-grid-extra'});
		me.plugins.push({ptype: 'bufferedrenderer'});


		Ext.apply(me, {
			columns: columns,
			store: me.configStore(),
			dockedItems: me.configDockedItems(),
			listeners: {
				select: Ext.emptyFn,
				storeLoad: Ext.emptyFn,
				storeAdd: Ext.emptyFn,
				storeRemove: Ext.emptyFn,
				storeUpdate: Ext.emptyFn,
				afterrender: Ext.emptyFn
			}
		});
		me.callParent(arguments);
	},
	configStore: function () {

		var me = this;
		if (me.store) {
			return me.store;
		}

		return Ext.create('Ext.data.Store', {
			fields: Ext.isArray(me.storeProps.fields) ? Ext.clone(me.storeProps.fields) : [],
			autoLoad: me.storeProps.autoLoad,
			proxy: {
				type: Ext.isEmpty(me.storeProps.url) ? 'memory' : 'ajax',
				url: me.storeProps.url,
				reader: {
					type: 'json',
					rootProperty: me.storeProps.rootProperty
				}
			},
			listeners: {
				load: function (store) {
					me.show();
					this.fireEventArgs('storeLoad', arguments);
				},
				add: function (store) {

					this.fireEventArgs('storeAdd', arguments);
				},
				remove: function (store) {

					this.fireEventArgs('storeRemove', arguments);
				},
				update: function (store) {
					this.fireEventArgs('storeUpdate', arguments);
				},
				scope: me

			}
		});


	}, configDockedItems: function () {
		var me = this;
		if (!me.dockedItems) {
			me.dockedItems = [];
		}
		var dockedItems = Ext.isArray(me.dockedItems) ? Ext.clone(me.dockedItems) : [];
		return dockedItems;

	}
});