Ext.define('PmhTech.grid.column.CheckColumn', {
    extend: 'Ext.grid.column.CheckColumn',
    alias: 'widget.pmh-checkcolumn',
    text: '&#160;',
    sortable: false,
    draggable: false,
    tdCls: 'no-dirty',
    resizable: false,
    hideable: false,
    menuDisabled: true,
    cls: Ext.baseCSSPrefix + 'column-header-checkbox',
    initComponent: function () {
        var me = this;
        Ext.apply(me, {
            listeners: {
                checkchange: function (checkcolumn, rowIndex, checked, record, e, eOpts) {

                    var isTrue = checkcolumn.up('grid').getStore().find(checkcolumn.dataIndex, false) == -1;
                    var isFalse = checkcolumn.up('grid').getStore().find(checkcolumn.dataIndex, true) == -1;
                    var headcheck = false;


                    if (isTrue == true && isFalse == false) {
                        headcheck = true;
                    }

                    checkcolumn.fireEvent('headercheckchange', checkcolumn, headcheck);

                },
                headercheckchange: function (checkcolumn, checked) {

                    if (checked) {
                        checkcolumn.getEl().addCls('x-grid-hd-checker-on');
                    } else {
                        checkcolumn.getEl().removeCls('x-grid-hd-checker-on');
                    }
                }
            }
        });
        me.callParent(arguments);

    }
})
;