
Ext.define('SysApp.view.prop.type.sysproptype.west.north.SysPropTypeGrid',{
    extend: 'PmhTech.grid.SimpleGrid',
    alias : 'widget.sys-prop-type-grid',
    controller: 'sys-prop-type-grid',

    title: '필드유형',
    storeProps : {
        rootProperty : 'sysPropTypes'
    },
    columns: [
        {text: 'XType', dataIndex: 'XTYPE_NM'},
        {text: 'ClassName', dataIndex: 'CLAZZ_NM'},
        {text: '사용유무', dataIndex: 'USE_YN'},
        {text: '정렬순서', dataIndex: 'SORT'}
    ],
    flex: 1,
    dockedItems: [{
        xtype: 'pmh-button-toolbar',
        dock: 'top',
        buttonAlign: 'right',
        btnItems: ['search']
    }]
});
