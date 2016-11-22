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
        fields: ['COMPANY', 'PRE_CD', 'CODE', 'CODE_NM', 'USE_YN', 'MEMO'],
        rootProperty: 'sysCodeGroup'
    },
    columns: [
        {
            text: '회사코드', dataIndex: 'COMPANY', align: '',

            editor: {
                xtype: 'pmh-combo-code',
                displayField: 'CODE_NM',
                valueField: 'CODE',
                sysCodeName: 'COM_000001'
            }, renderer: PmhTech.Format.comboRenderer
        },
        {text: '코드그룹', dataIndex: 'PRE_CD', align: 'right'},
        {text: '코드명', dataIndex: 'CODE_NM', align: 'center'}
    ]


});




