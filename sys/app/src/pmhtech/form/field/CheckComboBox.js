Ext.define('PmhTech.form.field.CheckComboBox', {
	extend: 'Ext.form.field.ComboBox',
	alias: 'widget.checkcombo2',
	multiSelect: true,
	allSelector: false,
	addAllSelector: false,
	allText: 'All',
	delimiterField:'',
	delimiterDisplayField:null,
	createPicker: function() {
		var me = this,
			picker,
			menuCls = Ext.baseCSSPrefix + 'menu',
			opts = Ext.apply({
				pickerField: me,
				selModel: {
					mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
				},
				floating: true,
				hidden: true,
				ownerCt: me.ownerCt,
				cls: me.el.up('.' + menuCls) ? menuCls : '',
				store: me.store,
				displayField: me.displayField,
				focusOnToFront: false,
				pageSize: me.pageSize,
				tpl:
					[
						'<tpl for=".">',
						'<tpl if="(\'' + me.delimiterField + '\') && (xindex==1 || parent[xindex-1][\'' + me.delimiterField + '\'] != parent[xindex-2][\'' + me.delimiterField + '\'])">&nbsp;<font color="blue">{' + me.delimiterDisplayField + '}</font></tpl>',
						'<li style="list-style-type:none" role="option" class="' + Ext.baseCSSPrefix + 'boundlist-item"><span class="x-combo-checker">&nbsp;</span> {' + me.displayField + '}</li>',
						'</tpl>'
					]
			}, me.listConfig, me.defaultListConfig);

		picker = me.picker = Ext.create('Ext.view.BoundList', opts);
		if (me.pageSize) {
			picker.pagingToolbar.on('beforechange', me.onPageChange, me);
		}

//	   me.mon(picker, {
//	       itemclick: me.onItemClick,
//	       refresh: me.onListRefresh,
//	       scope: me
//	   });

		me.mon(picker.getSelectionModel(), {
			'beforeselect': me.onBeforeSelect,
			'beforedeselect': me.onBeforeDeselect,
			'selectionchange': me.onListSelectionChange,
			scope: me
		});

		return picker;
	},

	onListSelectionChange: function(list, selectedRecords)
	{
		var me = this,
			isMulti = me.multiSelect,
			hasRecords = selectedRecords.length > 0;
		if (me.isExpanded) {
			if (!isMulti) {
				Ext.defer(me.collapse, 1, me);
			}
			if (isMulti || hasRecords) {
				me.setValue(selectedRecords, false);
			}
			if (hasRecords) {
				me.fireEvent('select', me, selectedRecords);
			}
			me.inputEl.focus();
		}

		if(me.addAllSelector == true && me.allSelector != false)
		{
			if(selectedRecords.length == me.store.getTotalCount()) me.allSelector.addCls('x-boundlist-selected');
			else me.allSelector.removeCls('x-boundlist-selected');
		}
	}
});