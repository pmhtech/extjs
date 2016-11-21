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


        }

        me.callParent(arguments);
    }
});