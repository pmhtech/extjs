
Ext.define('SysApp.view.prop.type.sysproptype.center.SysPropTypeDtlGrid',{
    extend: 'PmhTech.grid.SimpleGrid',
    alias : 'widget.sys-prop-type-dtl-grid',
    controller : 'sys-prop-type-dtl-grid',
    plugins:[
        {ptype : 'pmh-grid-excel-editor'},
        {ptype : 'pmh-grid-checker'}
    ],
    dockedItems: [{
        xtype: 'pmh-button-toolbar',
        dock: 'top',
        buttonAlign: 'right',
        btnItems: ['add','delete']
    }],
    columns: [
        {text: '필드속성'	, dataIndex : 'KEY', width : 110,
            editor : {xtype : 'textfield'}
        },
        {text : '타입'	, dataIndex : 'TYPE', renderer : PmhTech.Format.comboRenderer, width: 90,
            editor : {xtype : 'pmh-combo-code', store : SysCode['SYS_000010'].copy(false)}
        },
        {text : '값'		, dataIndex : 'DEFAULT_VALUE', editor : {xtype : 'textfield'},flex: 1}
    ],listeners : {
        InitMode : 'onInitMode',
        UpdateMode : 'onUpdateMode'
    },viewConfig : {
        plugins: [{  ptype: 'gridviewdragdrop',
            ddGroup: 'thisGrid'
        }]
    }
});
