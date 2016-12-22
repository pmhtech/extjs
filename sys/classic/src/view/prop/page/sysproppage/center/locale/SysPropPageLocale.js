
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
            {text : '필드명'        , dataIndex :'COMP_NAME',editor : {xtype : 'textfield'}},
            {text : 'Dom 주소'     , dataIndex : 'DOM_QRY',editor : {xtype : 'textfield'}},
            {text : '필드타입'       , dataIndex :'PROP_TYPE',editor : {xtype : 'textfield'}},
            {text : '필드타입'       , dataIndex :'PROP_VALUE'}

        ],
        listeners : {
            storeUpdate : 'onUpdateMaster'
        }

    },{
        xtype : 'pmh-grid-base',
        title : '기타속성값',
        itemId : 'fieldPropertyDtl',
        flex : 1,
        plugins :[{
           ptype : 'pmh-grid-excel-editor'
        }],
        dockedItems: [{
            xtype: 'pmh-button-toolbar',
            dock: 'top',
            buttonAlign : 'right',
            btnItems : ['insert','delete']
        }],
        columns : [
            {text : 'Property'  , dataIndex :'PROPERTY', editor : {xtype : 'textfield'}},
            {text : 'Value'     , dataIndex : 'VALUE'}
        ]
    }]
});
