Ext.define('SysApp.view.code.syscode.west.SysCodeGroupGrid',{
    extend: 'PmhTech.grid.Base',
    alias: 'widget.sys-code-group-grid',
    controller: 'sys-code-group-grid',
    height : '100%',
    dockedItems : [{
        xtype : 'pmh-button-toolbar',
        dock : 'top',
        buttonAlign : 'right',
        btnItems : ['search','insert','modify']

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
        rootProperty: 'sysCodeGroups'
    },
    columns: [
        {text: '코드그룹', dataIndex: 'PRE_CD', align: 'right'},
        {text: '코드명', dataIndex: 'CODE_NM', align: 'left'},
        {text: '사용유무', dataIndex: 'USE_YN', align: 'center'}
    ]
});
