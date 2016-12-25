
Ext.define('SysApp.view.prop.page.sysproppage.center.locale.SysPropPageLocale',{
    extend: 'Ext.panel.Panel',
    alias : 'widget.sys-prop-page-locale',
    controller: 'sys-prop-page-locale',
    layout : {
        type : 'hbox',
        align : 'stretch'
    },
    items : [{
        xtype : 'pmh-grid-base',
        itemId : 'fieldProperty',
        title : '컴포넌트 속성',
        flex : 1,
        plugins :[{
            ptype : 'pmh-grid-excel-editor'
        }],
        columns : [
            {text : '필드명'        , dataIndex :'DOM_LABEL'   ,editor : {xtype : 'textfield'}},
            {text : 'Dom 주소'     , dataIndex : 'DOM_QRY'     ,editor : {xtype : 'textfield'}},
            {text : '필드타입'       , dataIndex :'DOM_TYPE'   ,editor : {
                xtype : 'pmh-combo',
                storeProps : {
                  rootProperty : 'sysPropTypes'
                },
                displayField : 'XTYPE_NM',
                valueField : 'XTYPE_NM',
                listeners : {
                    change : 'onChangePROP_TYPE'
                }
            }},
            {text : '필드타입'       , dataIndex :'DOM_PROPS'},
            {text : '정렬순서'       , dataIndex :'SORT'}
        ],
        listeners : {
            storeUpdate : 'onUpdateStore'
        }
    },{
        xtype : 'propertygrid',
        flex : 1,
        title : '기타속성값',
        itemId : 'fieldPropertyDtl'
    }]
});
