/**
 *
 *
 *
 *
 *
 */
Ext.define('PmhTech.toolbar.Paging', {
    extend: 'Ext.toolbar.Paging',
    alias: 'widget.pmh-pagingtoolbar',

    displayInfo: true,
    displayMsg: 'Total Count :  {2}',
    getPagingItems: function () {
        var me = this,
            inputListeners = {
                scope: me,
                blur: me.onPagingBlur
            };

        inputListeners[Ext.supports.SpecialKeyDownRepeat ? 'keydown' : 'keypress'] = me.onPagingKeyDown;

        return [
            {
                itemId: 'refresh',
                tooltip: me.refreshText,
                overflowText: me.refreshText,
                iconCls: Ext.baseCSSPrefix + 'tbar-loading',
                disabled: me.store.isLoading(),
                handler: me.doRefresh,
                scope: me
            }];
    },
    initComponent: function () {
        var me = this;

        me.callParent(arguments);

    }
});