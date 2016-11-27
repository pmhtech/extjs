Ext.define('SysApp.view.sys.code.popup.tab.SysCodeRef', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.sys-code-ref',
    layout: 'fit',
    collapsible: true,
    title: '세부정보 설정',
    items: [{
        xtype: 'pmhtech-grid-base',
        frame: true,
        excelMode: true,
        rowNumberer: false,
        layout: 'fit',
        storeProps: {
            fields: ['COMPANY', 'PRE_CD', 'CODE', 'CODE_NM', 'USE_YN', 'MEMO'],
            rootProperty: 'sysCodeGroup'
        },
        columns: [
            {text: '참조필드', dataIndex: 'REF_FIELD', align: ''},
            {xtype: 'checkcolumn', text: '수정유무', dataIndex: 'REF_EDIT_YN', align: 'center'},
            {
                text: '입력형태', dataIndex: 'REF_TYPE', align: 'center', editor: {
                xtype: 'pmh-combo',
                store: 'FieldType',
                displayField: 'CODE_NM',
                valueField: 'REF1'
            }, renderer: PmhTech.Format.comboRenderer
            },
            {
                text: '코드그룹', dataIndex: 'REF_CD', align: 'left', editor: {
                xtype: 'pmh-combo',
                store: Ext.ComponentQuery.query('sys-code-grid')[0].getStore(),
                isShowCode: true,
                displayField: 'CODE_NM',
                valueField: 'PRE_CD'
            }, renderer: PmhTech.Format.comboRenderer
            }
        ], listeners: {
            beforeedit: function (editor, context) {

                var dataIndex = context.column.dataIndex;

                var recType = context.record.get('REF_TYPE');

                if (recType != '20') {
                    context.record.set('REF_CD', undefined);
                }

                if (dataIndex == 'REF_CD') {
                    if (recType != '20') {
                        return false;
                    }
                }
            },
            storeUpdate: function (thisStore, record, operation, modifiedFieldNames, details) {

                if (modifiedFieldNames[0] == 'REF_TYPE') {
                    if (record.get('REF_TYPE') != '20') {
                        record.set('REF_CD', undefined);
                    }
                }

            }
        }
    }]
});