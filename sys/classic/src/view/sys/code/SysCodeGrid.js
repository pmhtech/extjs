Ext.define('SysApp.view.sys.code.SysCodeGrid', {
    extend: 'PmhTech.grid.Base',
    alias: 'widget.sys-code-grid',
    controller: 'sys-code-grid',
    tbar: [{xtype: 'tbfill'}, {
        xtype: 'pmhtech-button-search',
        handler: 'onBtnSearch'
    }, {
        xtype: 'pmhtech-button-insert',
        handler: 'onBtnInsert'
    }, {
        xtype: 'pmhtech-button-update',
        handler: 'onBtnUpdate'
    }, {
        xtype: 'pmhtech-button-delete',
        handler: 'onBtnDelete'
    }],

    storeProps: {
        fields: ['COMPANY', 'PRE_CD', 'CODE', 'CODE_NM', 'USE_YN', 'MEMO']
    },
    columns: [
        { text: '회사코드', dataIndex: 'COMPANY'},
        { text: '코드그룹', dataIndex: 'PRE_CD' },
        { text: '코드명', dataIndex: 'CODE_NM' }
    ]
});