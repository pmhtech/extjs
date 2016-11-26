Ext.define('SysApp.view.sys.code.popup.tab.SysCodeRef', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.sys-code-ref',
    layout: 'fit',
    margin : 10,
    collapsible: true,
    title: '세부정보 설정',
    items: [{
        xtype: 'pmhtech-grid-base',
        frame: true,
        layout: 'fit',
        storeProps: {
            fields: ['COMPANY', 'PRE_CD', 'CODE', 'CODE_NM', 'USE_YN', 'MEMO'],
            rootProperty: 'sysCodeGroup'
        },
        columns: [
            {text: '참조필드', dataIndex: 'REF_FIELD', align: ''},
            {text: '수정유무', dataIndex: 'REF_EDIT)YN', align: 'right'},
            {text: '입력형태', dataIndex: 'REF_TYPE', align: 'center'},
            {text: '코드그룹', dataIndex: 'REF_CD', align: 'center'}
        ]
    }]
});