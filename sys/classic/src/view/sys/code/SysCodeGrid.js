Ext.define('SysApp.view.sys.code.SysCodeGrid',{
    extend : 'Ext.grid.Panel',
    alias : 'widget.sys_code_grid',
    controller : 'sys_code_grid',
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
        handler : 'onBtnInsertHandler'
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
       fields : ['COMPANY','PRE_CD','CODE','CODE_NM','USE_YN','MEMO']
    }),
    columns : [
        { text : '회사코드', dataIndex : 'COMPANY'},
        { text : '회사코드', dataIndex : 'PRE_CD'},
        { text : '회사코드', dataIndex : 'CODE'},
        { text : '회사코드', dataIndex : 'CODE_NM'},
        { text : '회사코드', dataIndex : 'USE_YN'}
    ]
});