Ext.define('SysApp.view.sys.code.SysCodeDetailGrid',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.sys_code_detail_grid',
    controller : 'sys_code',
    tbar: [,{
        xtype: 'button',
        itemId: 'insertBtn',
        text: '조회',
        httpMethod : 'GET',
        handler : 'actionSysCode'
    },{
        xtype: 'button',
        itemId: 'insertBtn',
        text: '추가',
        httpMethod : 'POST',
        handler : 'actionSysCode'
    },{
        xtype: 'button',
        itemId: 'updateBtn',
        httpMethod : 'PUT',
        handler : 'actionSysCode',
        text: '수정'
    },{
        xtype: 'button',
        itemId: 'deleteBtn',
        text: '삭제',
        httpMethod : 'DELETE',
        handler : 'actionSysCode'
    }],
    store : Ext.create('Ext.data.Store',{
        fields : ['COMPANY','PRE_CD','CODE','CODE_NM','REF1','REF2','REF3','REF4','REF5','USE_YN','MEMO']
    }),
    columns : [
        { text : '회사코드', dataIndex : 'COMPANY'},
        { text : '회사코드', dataIndex : 'PRE_CD'},
        { text : '회사코드', dataIndex : 'CODE'},
        { text : '회사코드', dataIndex : 'CODE_NM'},
        { text : '사용유무', dataIndex : 'USE_YN'}
    ]
});