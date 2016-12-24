
Ext.define('SysApp.view.prop.type.sysproptype.center.SysPropTypeDtlGrid',{
    extend: 'PmhTech.grid.Base',
    alias : 'widget.sys-prop-type-dtl-grid',
    controller : 'sys-prop-type-dtl-grid',
    plugins:[{
        ptype : 'pmh-grid-excel-editor'
    }],
    dockedItems: [{
        xtype: 'pmh-button-toolbar',
        dock: 'top',
        buttonAlign: 'right',
        btnItems: ['add','delete']
    }],
    columns: [
        {text: '필드속성'	, dataIndex : 'KEY',
            editor : {xtype : 'textfield'}
        },
        {text : '타입'	, dataIndex : 'TYPE', renderer : PmhTech.Format.comboRenderer,
            editor : {xtype : 'pmh-combo-code', store : SysCode['SYS_000010'].copy(false)}
        },
        {text : '값'		, dataIndex : 'DEFAULT_VALUE', editor : {xtype : 'textfield'}},
        {text : '정렬순서', dataIndex : 'SORT', editor : {xtype : 'numberfield'}}
    ]
});
