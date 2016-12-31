/**
 *
 */
Ext.define('PmhTech.override.grid.column.Column', {
	override: 'Ext.grid.column.Column',
	style: 'text-align:center',
	align: 'start',
	editable: false,
	initComponent: function () {
		var me = this;

		if (me.editor) {
			Ext.apply(me, {
				editor: Ext.widget(me.editor.xtype, me.editor),
				getEditor: function () {
					return me.editor;
				}
			});

			var columnRenderer = Ext.clone(me.renderer);

			Ext.apply(me, {
				renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
					var editor = this.getColumns()[colIndex].getEditor();
					var temp = Ext.isEmpty(value) ? '' : value;
					if (editor.getErrors(temp).length > 0) {
						metaData.style = 'background-color: yellow;';
					}
					if (Ext.isFunction(columnRenderer)) {

						return Ext.callback(columnRenderer, this, [value, metaData, record, rowIndex, colIndex, store, view]);

					}
					return value;
				}
			});
		}
		me.callParent(arguments);
	}
});