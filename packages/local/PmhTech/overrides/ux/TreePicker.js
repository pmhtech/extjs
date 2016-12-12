Ext.define('PmhTech.ux.TreePicker', {
	override: 'Ext.ux.TreePicker',
	createPicker: function () {
		var me = this,
			picker = new Ext.tree.Panel({
				baseCls: Ext.baseCSSPrefix + 'boundlist',
				shrinkWrapDock: 2,
				store: me.store,
				floating: true,
				displayField: me.displayField,
				columns: me.columns,
				minWidth : me.minPickerWidth,
				minHeight: me.minPickerHeight,
				maxHeight: me.maxPickerHeight,
				manageHeight: false,
				shadow: false,
				listeners: {
					scope: me,
					itemclick: me.onItemClick,
					itemkeydown: me.onPickerKeyDown
				}
			}),
			view = picker.getView();

		if (Ext.isIE9 && Ext.isStrict) {
			// In IE9 strict mode, the tree view grows by the height of the horizontal scroll bar when the items are highlighted or unhighlighted.
			// Also when items are collapsed or expanded the height of the view is off. Forcing a repaint fixes the problem.
			view.on({
				scope: me,
				highlightitem: me.repaintPickerView,
				unhighlightitem: me.repaintPickerView,
				afteritemexpand: me.repaintPickerView,
				afteritemcollapse: me.repaintPickerView
			});
		}
		return picker;
	}
});