Ext.define('SysApp.view.sys.code.master.SysCodeGrid', {
    extend: 'PmhTech.grid.Base',
    alias: 'widget.sys-code-grid',
    controller: 'sys-code-grid',
    height: 300,
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
        fields: [
            { name : 'PRE_CD'},
            { name : 'CODE'},
            { name : 'CODE_NM'},
            { name : 'REF1_CONFIG'},
            { name : 'REF2_CONFIG'},
            { name : 'REF3_CONFIG'},
            { name : 'REF4_CONFIG'},
            { name : 'REF5_CONFIG'},
            { name : 'USE_YN'},
            { name : 'MEMO'}

        ],
        rootProperty: 'sysCodeGroup'
    },
    columns: [
        {text: '코드그룹', dataIndex: 'PRE_CD', align: 'right'},
        {text: '코드명', dataIndex: 'CODE_NM', align: 'left'},
        {text: '사용유무', dataIndex: 'USE_YN', align: 'center'}
    ]


});




